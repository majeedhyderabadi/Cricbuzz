import axios from "axios";

export interface Sport {
  id: string;
  name: string;
  description: string;
}

export interface CreateSportRequest {
    name: string;
    description: string;
}

export interface SportRole {
    roleId: string;
    roleName: string;
    description: string;
    sportId: string;
}

const API_BASE_URL = `${import.meta.env.VITE_CRICBUZZ_BACKEND_BASE_URL}/api/sports`; 

export const getSports = async (): Promise<Sport[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/sports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch sports.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching sports:", error);
    throw error;
  }
};

export const createSport = async (
    request: CreateSportRequest
): Promise<void> => {

    try {

        const response = await fetch(`${API_BASE_URL}/sports`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error("Failed to create sport.");
        }

    } catch (error) {
        console.error("Error creating sport:", error);
        throw error;
    }
};

export const getSportRoles = async (): Promise<SportRole[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/sportroles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch sport roles.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching sport roles:", error);
        throw error;
    }
};

export const getSportRolesBySportId = async (
  sportId: string
): Promise<SportRole[]> => {
  const response = await axios.get<SportRole[]>(
    `${API_BASE_URL}/sports/${sportId}/roles`
  );

  return response.data;
};

export const createSportRole = async (data: {
  roleName: string;
  description: string;
  sportId: string;
}) => {
  const response = await axios.post(
    `${API_BASE_URL}/sports/roles`,
    data
  );

  return response.data;
};

