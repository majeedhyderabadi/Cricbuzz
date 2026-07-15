import axios from "axios";

export interface LiveMatchResponse {
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

export interface FeedingMatch {
    id: number;
    sport: string;
    team1: string;
    team2: string;
    score: string;
    stage: string;
    progress: string;
}

export interface CommentaryRequest {
    side: 0 | 1;   
    playerId: string;
    action: number;
    note?: string;
}

const API_URL = "https://localhost:62965/api";

export async function getLiveMatches(): Promise<FeedingMatch[]> {
    try {
        const response = await fetch(`${API_URL}/fixtures/live`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch live matches: ${response.status}`);
        }

        const data: LiveMatchResponse[] = await response.json();
        return mapLiveMatchesToFeedingMatches(data);
    } catch (error) {
        console.error("Error fetching live matches:", error);
        throw error;
    }
}

function mapLiveMatchesToFeedingMatches(
    liveMatches: LiveMatchResponse[]
): FeedingMatch[] {
    return liveMatches.map((match, index) => {
        let score = "";
        let stage = "";
        let progress = "";

        if (match.sport.toLowerCase() === "cricket") {
            score = `${match.homeScore}/${match.homeWickets} - ${match.awayScore}/${match.awayWickets}`;
            stage = match.status === "Live" ? "Live" : "Completed";
            progress = getCricketProgress(match);
        } else if (match.sport.toLowerCase() === "football") {
            score = `${match.homeScore} - ${match.awayScore}`;
            stage = match.status === "Live" ? "Live" : "Completed";
            progress = getFootballProgress(match);
        } else {
            score = `${match.homeScore} - ${match.awayScore}`;
            stage = match.status || "In Progress";
            progress = "In Progress";
        }

        return {
            id: index + 1,
            sport: match.sport,
            team1: match.homeTeamName,
            team2: match.awayTeamName,
            score: score,
            stage: stage,
            progress: progress,
        };
    });
}

function getCricketProgress(match: LiveMatchResponse): string {

    if (match.status === "Live") {
        return "In Progress";
    }
    return "Completed";
}

function getFootballProgress(match: LiveMatchResponse): string {
    if (match.status === "Live") {
        return "In Progress";
    }
    return "Full Time";
}

export async function getLiveMatchesWithOriginalIds(): Promise<FeedingMatch[]> {
    try {
        const response = await fetch(`${API_URL}/fixtures/live`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch live matches: ${response.status}`);
        }

        const data: LiveMatchResponse[] = await response.json();
        console.log("Fetched live matches:", data);
        return data.map((match) => ({
            id: parseInt(match.id.substring(0, 8), 16),
            sport: match.sport,
            team1: match.homeTeamName,
            team2: match.awayTeamName,
            score: `${match.homeScore}/${match.homeWickets} - ${match.awayScore}/${match.awayWickets}`,
            stage: match.status,
            progress: match.status === "Live" ? "In Progress" : "Completed",
        }));
    } catch (error) {
        console.error("Error fetching live matches:", error);
        throw error;
    }
}


export const fetchLiveTeams = async() =>{
    try {
        const response = await axios.get(`${API_URL}/teams`);
        console.log("Fetched live teams:", response.data);
        return response.data;

    } catch (e) {
        console.log("Error fetching live teams:", e?.response);
        console.log("Error fetching live teams data:", e);
    }
}

export const liveFixtures = async() =>{
    try {
        const response = await axios.get(`${API_URL}/fixtures/live`);
        console.log("Fetched live fixtures:", response.data);
        return response.data;
    } catch (e) {
        console.log("Error fetching live fixtures:", e?.response);
        console.log("Error fetching live fixtures data:", e);
    }
}

export async function postCommentary(fixtureId: string, data: CommentaryRequest) {
    const response = await fetch(`${API_URL}/fixtures/${fixtureId}/commentary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to post commentary: ${response.status} ${errorText}`);
    }

    return response.json();
}