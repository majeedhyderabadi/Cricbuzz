import type { MatchDetailsModel,MatchSource } from "../../components/types/MatchDetailsModel";

import { getCricbuzzMatchInfo } from "../MatchDataService";
import { getFixtureMatchDetails } from "../MatchDataService";
import { mapFixtureMatchDetails } from "../../Pages/MatchDetailsPage/FixtureDetailsMapper";

import { mapCricbuzzMatchDetails } from "../../Pages/MatchDetailsPage/CricbuzzMatchDetailsMapper";

// Future
// import { getFixtureMatchDetails } from "./FixtureService";
// import { mapFixtureMatchDetails } from "../components/MatchDetails/fixtureMatchDetailsMapper";

export async function getMatchDetails(
  matchId: string,
  source: MatchSource
): Promise<MatchDetailsModel> {

  switch (source) {

    case "cricbuzz": {

      const response =
        await getCricbuzzMatchInfo(Number(matchId));

      const commentaryStorageKey =
        `match-commentary-${matchId}`;

      const savedCommentary =
        localStorage.getItem(commentaryStorageKey);

      const previousCommentary =
        savedCommentary
          ? JSON.parse(savedCommentary)
          : {};

      const mergedCommentary = {
        ...previousCommentary,
        ...(response.matchCommentary ?? {})
      };

      localStorage.setItem(
        commentaryStorageKey,
        JSON.stringify(mergedCommentary)
      );

      return mapCricbuzzMatchDetails({
        ...response,
        matchCommentary: mergedCommentary
      });
    }

    case "fixture": {
 
  const response =
    await getFixtureMatchDetails(matchId);

  return mapFixtureMatchDetails(response);
}

    default:
      throw new Error("Unsupported match source.");
  }
}