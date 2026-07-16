import axios from "axios";


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

export const getLiveFixtures = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/fixtures/live`
  );

  return response.data;
};

export const searchCurrentMatches = async (searchTerm: string) => {
    const response = await axios.get(
        `${API_BASE_URL}/fixtures/search`,
        {
            params: {
                searchTerm
            }
        }
    );

    return response.data;
};

