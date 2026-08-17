import { useEffect, useRef, useState } from "react";
import { HubConnectionState, type HubConnection } from "@microsoft/signalr";
import { createCommentaryHubConnection } from "../lib/signalrClient";

// Minimal score update shape used by the UI.
export interface ScoreUpdate {
  fixtureId: string;
  homeScore: number;
  homeWickets?: number;
  awayScore: number;
  awayWickets?: number;
  updatedAtUtc?: string;
}

const SCORE_EVENT = "ScoreUpdated";

export function useScoreUpdateFeed(
  fixtureId: string,
  options?: {
    simulate?: boolean;
    intervalMs?: number;
    initialScore?: ScoreUpdate;
  },
) {
  const simulate = options?.simulate ?? false;
  const intervalMs = options?.intervalMs ?? 3000;

  const [scoreByMatch, setScoreByMatch] = useState<Record<string, ScoreUpdate>>(
    {},
  );
  const [connectionState, setConnectionState] = useState<HubConnectionState>(
    HubConnectionState.Disconnected,
  );
  const connectionRef = useRef<HubConnection | null>(null);
  const joinedFixtureRef = useRef<string | null>(null);

  useEffect(() => {
    if (simulate) {
      // No real SignalR connection in simulate mode.
      setConnectionState(HubConnectionState.Connected);
      return;
    }

    let cancelled = false;

    const connection = createCommentaryHubConnection();
    connectionRef.current = connection;

    connection.on(SCORE_EVENT, (update: ScoreUpdate) => {
      if (cancelled) return;
      setScoreByMatch((previous) => ({
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
        console.error("Failed to connect to score hub", error);
        setConnectionState(HubConnectionState.Disconnected);
      });

    return () => {
      cancelled = true;
      connectionRef.current = null;
      joinedFixtureRef.current = null;
      connection.off(SCORE_EVENT);
      startPromise.finally(() => {
        connection.stop();
      });
    };
  }, [simulate]);

  useEffect(() => {
    setScoreByMatch({});

    const connection = connectionRef.current;
    if (
      !connection ||
      !fixtureId ||
      connectionState !== HubConnectionState.Connected ||
      simulate
    ) {
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
        console.error("Failed to switch fixture group for score feed", error);
      }
    };

    switchGroup();
  }, [fixtureId, connectionState, simulate]);

  // Simulation: generate mock updates when requested and backend is not available.
  useEffect(() => {
    if (!simulate || !fixtureId) return;

    const base =
      options?.initialScore ??
      ({
        fixtureId,
        homeScore: 0,
        homeWickets: 0,
        awayScore: 0,
        awayWickets: 0,
        updatedAtUtc: new Date().toISOString(),
      } as ScoreUpdate);

    setScoreByMatch({ [fixtureId]: base });

    let runs = base.homeScore;
    let wkts = base.homeWickets ?? 0;

    const id = setInterval(() => {
      runs += Math.floor(Math.random() * 3); // add 0-2 runs
      if (Math.random() < 0.1) wkts += 1; // 10% chance wicket

      const update: ScoreUpdate = {
        fixtureId,
        homeScore: runs,
        homeWickets: wkts,
        awayScore: base.awayScore,
        awayWickets: base.awayWickets,
        updatedAtUtc: new Date().toISOString(),
      };

      setScoreByMatch((prev) => ({ ...prev, [fixtureId]: update }));
    }, intervalMs);

    return () => clearInterval(id);
  }, [simulate, fixtureId, intervalMs, options]);

  return { scoreByMatch, connectionState };
}

export default useScoreUpdateFeed;
