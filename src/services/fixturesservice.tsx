import axios from "axios";

const API_BASE_URL = "https://localhost:62965/api";

export interface SportRole {
    roleId: string;
    roleName: string;
    description: string;
}

export interface Sport {
    id: string;
    name: string;
    description: string;
    sportRoles: SportRole[];
}

export interface Fixture {
    id: string;
    homeTeamId: string;
    homeTeamName: string;
    awayTeamId: string;
    awayTeamName: string;
    sport: string;
    scheduledAtUtc: string;
    status: string;
    homeScore: number;
    homeWickets: number;
    awayScore: number;
    awayWickets: number;
}

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "*/*",
    },
});

export const sportService = {
    getSports: async (): Promise<Sport[]> => {
        const response = await api.get<Sport[]>("/sports");
        return response.data;
    },
};

export const fixtureService = {
    getLiveFixtures: async (): Promise<Fixture[]> => {
        const response = await api.get<Fixture[]>("/fixtures/live");
        return response.data;
    },
};

export default api;