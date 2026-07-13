import axios from "axios";

const API_BASE_URL = "https://localhost:62965/api"; 
export interface CreateTeamRequest {
    name: string;
    sportId: string;
    colorHex: string;
}
export interface Team {
    id: string;
    teamName: string;
    sportId: string;
    sportName: string;
    color: string;
    players:Player[];
}
export interface CreatePlayerRequest {
  playerName: string;
  teamId: string;
  sportRoleId: string;
}
export interface UpdatelayerRequest {
 playerId: string;
  playerName: string;
  teamId: string;
  sportRoleId: string;
}

export interface Player {
    playerName: string,
    role: string,
    playerId: string,
    roleId: string,
    teamId:string
}
export interface UpdateTeamRequest {
    id: string;
    name: string;
    sportId: string;
    colorHex: string;
}
export const createTeam = async (
    team: CreateTeamRequest
): Promise<void> => {

    try {
        const response = await fetch(`${API_BASE_URL}/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(team),
        });

        if (!response.ok) {
            throw new Error("Failed to create team.");
        }

    } catch (error) {
        console.error("Error creating team:", error);
        throw error;
    }
};
export const getTeams = async (): Promise<Team[]> => {
    const response = await axios.get(`${API_BASE_URL}/teams`);
    return response.data.map((item: any) => ({
        id: item.id,
        teamName: item.teamName,
        sportName: item.sport.name,
        sportId: item.sportId,
        color: item.color,
        players: item.players.map((player: any) => ({
            playerId: player.playerId,
            playerName: player.playerName,
            role: player.role,
            roleId: player.roleId,
            teamId: item.id 
        }))
    }));
};

export const createPlayer = async (
  request: CreatePlayerRequest
) => {
  const response = await axios.post(
    `${API_BASE_URL}/players`,
    request
  );

  return response.data;
};

export const deleteTeam = async (teamId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/teams/${teamId}`);
};

export const deletePlayer = async (
    playerId: string
): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/players/${playerId}`);
};

export const updateTeam = async (
    team: UpdateTeamRequest
): Promise<void> => {

    await axios.put(`${API_BASE_URL}/teams/${team.id}`, team);
};
export const updatePlayer = async (
  request: UpdatelayerRequest
) => {
  const response = await axios.put(
    `${API_BASE_URL}/players/${request.playerId}`,
    request
  );

  return response.data;
};
