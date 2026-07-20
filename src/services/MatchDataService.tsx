import axios from "axios";
import type { Fixture } from "../components/types/Fixture";

const API_BASE_URL = "https://localhost:62965/api";

export const getCurrentMatches = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/matches/cricbuzz/current`
  );

  return response.data;
};

export const getMatchDetails = async (matchId: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/matches/${matchId}`
  );

  return response.data;
};

export const getCricbuzzMatchInfo = async (matchId: number) => {
    console.log(`${API_BASE_URL}/matches/cricbuzz/${matchId}/info`)
  const response = await axios.get(
    `${API_BASE_URL}/matches/cricbuzz/${matchId}/info`
  );

  return response.data;
};

export const getCricbuzzScorecard = async (matchId: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/matches/cricbuzz/${matchId}/scorecard`
  );

  return response.data;
};

export const getLiveFixtures = async (): Promise<Fixture[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/fixtures/live`
  );
      return response.data.map((item: any) => ({
        id: item.id,
        homeTeamId: item.homeTeamId,
        homeTeamName: item.homeTeamName,
        awayTeamId: item.awayTeamId,
        awayTeamName: item.awayTeamName,
        sport: item.sport,
        scheduledAtUtc: item.scheduledAtUtc,
        status: item.status,
        homeScore: item.homeScore,
        homeWickets: item.homeWickets,
        awayScore: item.awayScore,
        awayWickets: item.awayWickets
    }));
};

