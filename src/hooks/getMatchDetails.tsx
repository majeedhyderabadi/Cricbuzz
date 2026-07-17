import { getCricbuzzMatchInfo } from "../services/MatchDataService";
//import {getAdminM}

import { mapCricbuzzMatchDetails } from "../Pages/MatchDetailsPage/CricbuzzMatchDetailsMapper";
import { mapAdminMatchDetails } from "../Pages/MatchDetailsPage/AdminMatchDetailsMapper";

import type { GenericMatchDetailsModel } from "../components/types/GenericMatchDetailsModel";

export type MatchSource = "cricbuzz" | "admin";

export async function getMatchDetails(
    source: MatchSource,
    matchId: string
): Promise<GenericMatchDetailsModel> {

    switch (source) {

        case "cricbuzz": {

            const response = await getCricbuzzMatchInfo(Number(matchId));

            return mapCricbuzzMatchDetails(response);
        }

        case "admin": {

            const response = await getAdminMatchDetails(matchId);

            return mapAdminMatchDetails(response);
        }

        default:
            throw new Error("Unsupported match source");
    }
}