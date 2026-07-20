import { useEffect, useState } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import { createCommentaryHubConnection } from "../lib/signalrClient";
import type { CommentaryUpdate } from "../types/commentary";


const COMMENTARY_EVENT = "CommentaryReceived";

export function useCommentaryFeed(fixtureId: string) {

    const [commentaryByMatch, setCommentaryByMatch] = useState<Record<string, CommentaryUpdate>>({});
    const [connectionState, setConnectionState] = useState<HubConnectionState>(HubConnectionState.Disconnected);

    useEffect(() => {

        const connection = createCommentaryHubConnection();

        connection.on(COMMENTARY_EVENT, (update: CommentaryUpdate) => {
        
         setCommentaryByMatch((previous) => ({
    ...previous,
    [update.fixtureId]: update,
}));

        });

        connection.onreconnecting(() => setConnectionState(HubConnectionState.Reconnecting));

        connection.onreconnected(() => {
            setConnectionState(HubConnectionState.Connected);
            connection.invoke("JoinFixtureGroup", fixtureId);
        });

        connection.onclose(() => setConnectionState(HubConnectionState.Disconnected));

        connection
            .start()
            .then(() => {
                setConnectionState(HubConnectionState.Connected);
                return connection.invoke("JoinFixtureGroup", fixtureId);
            })
            .catch((error) => {

                console.error("Failed to connect to commentary hub", error);
                setConnectionState(HubConnectionState.Disconnected);

            });

        return () => {

            connection.off(COMMENTARY_EVENT);
            connection.stop();

        };

    }, [fixtureId]);

    return { commentaryByMatch, connectionState };

}
