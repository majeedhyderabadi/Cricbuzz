import axios from "axios";
import type { CricbuzzMatchDetailsResponse } from "../components/types/CricbuzzLiveMatchInfo";
import type { FixtureDetailsDto } from "../components/types/FixtureDetails";


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

export const searchLiveFixtures = async (searchText: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/fixtures/search`,
    {
      params: {
        searchText,
      },
    }
  );
 
  return response.data;
};

export const getCricbuzzMatchInfo = async (
  matchId: string
): Promise<CricbuzzMatchDetailsResponse> => {

  const response = await axios.get<CricbuzzMatchDetailsResponse>(
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



export const getLiveFixtures = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/fixtures/live`
  );
 
  return response.data;
};


export const searchCurrentMatches = async (searchText: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/matches/search`,
    {
      params: {
        searchText,
      },
    }
  );

  return response.data;
};

export const getFixtureMatchDetails = async (
  fixtureId: string
): Promise<FixtureDetailsDto> => {

  const response = await axios.get<FixtureDetailsDto>(
    `${API_BASE_URL}/fixtures/${fixtureId}`
  );

  return response.data;
};
