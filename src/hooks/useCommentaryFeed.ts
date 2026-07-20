import { useEffect, useState } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import { createCommentaryHubConnection } from "../lib/signalrClient";
import type { CommentaryUpdate } from "../types/commentary";


const COMMENTARY_EVENT = "CommentaryReceived";

export function useCommentaryFeed(fixtureId: string) {

    const [commentaryByMatch, setCommentaryByMatch] = useState<Record<string, CommentaryUpdate>>({});
    const [connectionState, setConnectionState] = useState<HubConnectionState>(HubConnectionState.Disconnected);

    useEffect(() => {

        let cancelled = false;

        setCommentaryByMatch({});

        const connection = createCommentaryHubConnection();

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
            connection.invoke("JoinFixtureGroup", fixtureId);
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
                return connection.invoke("JoinFixtureGroup", fixtureId);
            })
            .catch((error) => {

                if (cancelled) return;
                console.error("Failed to connect to commentary hub", error);
                setConnectionState(HubConnectionState.Disconnected);

            });

        return () => {

            cancelled = true;
            connection.off(COMMENTARY_EVENT);

            // .start() must settle before .stop() is safe to call, otherwise
            // the underlying WebSocket can be left stuck in a pending state.
            startPromise.finally(() => {
                connection.stop();
            });

        };

    }, [fixtureId]);

    return { commentaryByMatch, connectionState };

}
