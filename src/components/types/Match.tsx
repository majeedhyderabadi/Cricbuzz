export type Match = {

    id: string;
    name: string;
    matchType: string;
    status: string;
    venue: string;

    date: string;
    dateTimeGMT: string;

    teams: string[];

    teamInfo: {
        name: string;
        shortname: string;
        img: string;
    }[];

    score: {
        r: number;
        w: number;
        o: number;
        inning: string;
    }[];

    tossWinner: string;
    tossChoice: string;
    matchWinner: string;

    series_id: string;

    fantasyEnabled: boolean;
    bbbEnabled: boolean;
    hasSquad: boolean;

    matchStarted: boolean;
    matchEnded: boolean;

}