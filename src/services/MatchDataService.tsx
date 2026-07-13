import axios from "axios";


const API_BASE_URL = "https://localhost:62965/api";

export const getCurrentMatches = async (offset: number = 0) => {
  const response = await axios.get(
    `${API_BASE_URL}/matches/current?offset=${offset}`
  );

  return response.data;
};

export const getMatchDetails = async (matchId: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/matches/${matchId}`
  );

  return response.data;
};

