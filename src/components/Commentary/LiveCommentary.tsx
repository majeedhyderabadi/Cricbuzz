import { useEffect, useState } from "react";

import CommentaryBox, {
    type Comment
} from "../Commentary/CommentaryBox.tsx";

import { getCricbuzzMatchInfo } from "../../services/MatchDataService.tsx";

import type { CricbuzzMatchDetailsResponse } from "../types/CricbuzzLiveMatchInfo.tsx";

type Props = {
    matchId?: string;
};

function LiveCommentary({
    matchId
}: Props) {


    const [matchDetails, setMatchDetails] =
        useState<CricbuzzMatchDetailsResponse | null>(null);

    useEffect(() => {

        if (!matchId) return;
 console.log("useEffect fired", matchId);
        const loadMatchDetails = async () => {

            try {

                const response =
                    await getCricbuzzMatchInfo(matchId);

                setMatchDetails(response);

            } catch (error) {

                console.error(error);

            }

        };

        loadMatchDetails();

    }, [matchId]);



    const comments: Comment[] =
        matchDetails
            ? Object.values(matchDetails.matchCommentary).map(item => ({
                  id: item.timestamp.toString(),
                  time: new Date(item.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                  }),
                  type: item.overSeparator
                      ? `Over ${item.overSeparator.overNumber}`
                      : item.commType,
                  player: item.batsmanDetails?.playerName ?? "",
                  team :"",
                 text: item.commText? item.commText.replace(/<[^>]*>/g, ""): "",
                  fixture: item.event?.join(", ") ?? ""
              }))
            : [];
console.log (comments)

    return (
        <CommentaryBox
            title="Live Commentary"
            comments={comments}
        />
    );
}

export default LiveCommentary;