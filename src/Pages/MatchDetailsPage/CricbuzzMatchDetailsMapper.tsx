import type { MatchDetailsModel } from "../../components/types/MatchDetailsModel";
import type { CricbuzzMatchDetailsResponse } from "../../components/types/CricbuzzLiveMatchInfo";

export function mapCricbuzzMatchDetails(
  response: CricbuzzMatchDetailsResponse
): MatchDetailsModel {

  return {
   source: "cricbuzz",
    header: {

      ...response.matchHeader,

      matchId: response.matchHeader.matchId.toString(),

      seriesId: response.matchHeader.seriesId.toString(),

      tossResults: {
        ...response.matchHeader.tossResults,
        tossWinnerId:
          response.matchHeader.tossResults.tossWinnerId.toString()
      },

      result: {
        ...response.matchHeader.result,
        winningTeamId:
          response.matchHeader.result.winningTeamId?.toString() ?? null
      },

      matchTeamInfo:
        response.matchHeader.matchTeamInfo.map(team => ({
          ...team,
          battingTeamId: team.battingTeamId.toString(),
          bowlingTeamId: team.bowlingTeamId.toString()
        })),

      team1: {
        ...response.matchHeader.team1,
        id: response.matchHeader.team1.id.toString()
      },

      team2: {
        ...response.matchHeader.team2,
        id: response.matchHeader.team2.id.toString()
      }

    },
live: response.miniscore
  ? {

      ...response.miniscore,

      batTeam: {
        ...response.miniscore.batTeam,
        teamId:
          response.miniscore.batTeam.teamId.toString()
      },

      batsmanStriker:
        response.miniscore.batsmanStriker && {
          ...response.miniscore.batsmanStriker,
          id:
            response.miniscore.batsmanStriker.id.toString()
        },

      batsmanNonStriker:
        response.miniscore.batsmanNonStriker && {
          ...response.miniscore.batsmanNonStriker,
          id:
            response.miniscore.batsmanNonStriker.id.toString()
        },

      bowlerStriker:
        response.miniscore.bowlerStriker && {
          ...response.miniscore.bowlerStriker,
          id:
            response.miniscore.bowlerStriker.id.toString()
        },

      bowlerNonStriker:
        response.miniscore.bowlerNonStriker && {
          ...response.miniscore.bowlerNonStriker,
          id:
            response.miniscore.bowlerNonStriker.id.toString()
        },

      matchScoreDetails: {

        ...response.miniscore.matchScoreDetails,

        matchId:
          response.miniscore.matchScoreDetails.matchId.toString(),

        inningsScoreList:
          response.miniscore.matchScoreDetails.inningsScoreList.map(
            inning => ({
              ...inning,
              batTeamId: inning.batTeamId.toString()
            })
          )

      },

      batTeamScoreObj: {
        ...response.miniscore.batTeamScoreObj,

        teamInningsArray:
          response.miniscore.batTeamScoreObj.teamInningsArray.map(
            inning => ({
              ...inning,
              batTeamId: inning.batTeamId.toString()
            })
          )
      },

      bowlTeamScoreObj: {
        ...response.miniscore.bowlTeamScoreObj,

        teamInningsArray:
          response.miniscore.bowlTeamScoreObj.teamInningsArray.map(
            inning => ({
              ...inning,
              batTeamId: inning.batTeamId.toString()
            })
          )
      }

    }
  : null,

    commentary:

      Object.fromEntries(

        Object.entries(response.matchCommentary).map(
          ([key, value]) => [

            key,

            {

              ...value,

              matchId: value.matchId.toString(),

              batsmanDetails: {
                ...value.batsmanDetails,
                playerId:
                  value.batsmanDetails.playerId.toString()
              },

              bowlerDetails: {
                ...value.bowlerDetails,
                playerId:
                  value.bowlerDetails.playerId.toString()
              },

              overSeparator:

                value.overSeparator && {

                  ...value.overSeparator,

                  batStrikerObj: {
                    ...value.overSeparator.batStrikerObj,
                    playerId:
                      value.overSeparator.batStrikerObj.playerId.toString()
                  },

                  batNonStrikerObj: {
                    ...value.overSeparator.batNonStrikerObj,
                    playerId:
                      value.overSeparator.batNonStrikerObj.playerId.toString()
                  },

                  bowlerObj: {
                    ...value.overSeparator.bowlerObj,
                    playerId:
                      value.overSeparator.bowlerObj.playerId.toString()
                  }

                }

            }

          ]
        )

      ),

    enableNoContent:
      response.enableNoContent,

    matchVideos:
      response.matchVideos,

    page:
      response.page,

    responseLastUpdated:
      response.responseLastUpdated

  };

}