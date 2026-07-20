import { useEffect, useRef, useState } from "react";
import { HubConnectionState, type HubConnection } from "@microsoft/signalr";
import { createCommentaryHubConnection } from "../lib/signalrClient";
import type { CommentaryUpdate } from "../types/commentary";


const COMMENTARY_EVENT = "CommentaryReceived";

export function useCommentaryFeed(fixtureId: string) {

    const [commentaryByMatch, setCommentaryByMatch] = useState<Record<string, CommentaryUpdate>>({});
    const [connectionState, setConnectionState] = useState<HubConnectionState>(HubConnectionState.Disconnected);
    const connectionRef = useRef<HubConnection | null>(null);
    const joinedFixtureRef = useRef<string | null>(null);

    // Create and start the hub connection once for the life of the hook.
    // Re-creating the WebSocket on every fixtureId change is what caused
    // handshakes to pile up and get stuck "pending".
    useEffect(() => {

        let cancelled = false;

        const connection = createCommentaryHubConnection();
        connectionRef.current = connection;

        connection.on(COMMENTARY_EVENT, (update: CommentaryUpdate) => {

            if (cancelled) return;

            setCommentaryByMatch((previous) => ({
                ...previous,
                [update.fixtureId]: update,
            }));

        });

        connection.onreconnecting(() => {
            if (cancelled) return;
            setConnectionState(HubConnectionState.Reconnecting);
        });

        connection.onreconnected(() => {
            if (cancelled) return;
            setConnectionState(HubConnectionState.Connected);
        });

        connection.onclose(() => {
            if (cancelled) return;
            setConnectionState(HubConnectionState.Disconnected);
        });

        const startPromise = connection
            .start()
            .then(() => {
                if (cancelled) return;
                setConnectionState(HubConnectionState.Connected);
            })
            .catch((error) => {

                if (cancelled) return;
                console.error("Failed to connect to commentary hub", error);
                setConnectionState(HubConnectionState.Disconnected);

            });

        return () => {

            cancelled = true;
            connectionRef.current = null;
            joinedFixtureRef.current = null;
            connection.off(COMMENTARY_EVENT);

            // .start() must settle before .stop() is safe to call, otherwise
            // the underlying WebSocket can be left stuck in a pending state.
            startPromise.finally(() => {
                connection.stop();
            });

        };

    }, []);

    // Join the current fixture's group whenever it changes, or whenever the
    // connection (re)connects. Reuses the single long-lived connection above,
    // and leaves the previously-joined group so stale fixtures stop
    // broadcasting commentary onto this connection.
    useEffect(() => {

        setCommentaryByMatch({});

        const connection = connectionRef.current;

        if (!connection || !fixtureId || connectionState !== HubConnectionState.Connected) {
            return;
        }

        const previousFixtureId = joinedFixtureRef.current;

        const switchGroup = async () => {
            try {
                if (previousFixtureId && previousFixtureId !== fixtureId) {
                    await connection.invoke("LeaveFixtureGroup", previousFixtureId);
                }
                await connection.invoke("JoinFixtureGroup", fixtureId);
                joinedFixtureRef.current = fixtureId;
            } catch (error) {
                console.error("Failed to switch fixture group", error);
            }
        };

        switchGroup();

    }, [fixtureId, connectionState]);

    return { commentaryByMatch, connectionState };

}
