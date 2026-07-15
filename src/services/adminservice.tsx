export interface RegisterAdminRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface AdminApprovalRequest {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface AdminLoginResponse {
    token: string;
    adminId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

const API_URL = "http://localhost:5000/api/admin";

export async function registerAdmin(data: RegisterAdminRequest) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
     console.log(response)
    if (!response.ok) {
        throw new Error("Admin registration failed");
    }

    return response.json();
}


export async function getAdminApprovalRequests(): Promise<AdminApprovalRequest[]> {
    const response = await fetch(
        `${API_URL}/approval-requests`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch admin approval requests");
    }

    return response.json();
}

export async function approveAdmin(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/approve/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to approve admin");
    }
}

export interface AdminLoginRequest {
    email: string;
    password: string;
}

export async function loginAdmin(
    data: AdminLoginRequest
): Promise<AdminLoginResponse> {

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Invalid email or password");
    }

    return response.json();
}