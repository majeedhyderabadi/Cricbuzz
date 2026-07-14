import "./MatchDetailsPage.css";

import MatchHeader from "../../components/MatchDetails/MatchHeader";
import MatchSummary from "../../components/MatchDetails/MatchSummary";
import MatchStats from "../../components/MatchDetails/MatchStats";
import MatchTabs, {
  type MatchTab
} from "../../components/MatchDetails/MatchTabs";
import MatchInfo from "../../components/MatchDetails/MatchInfo";
import MatchCommentary from "../../components/MatchDetails/MatchCommentary";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCricbuzzMatchInfo } from "../../services/MatchDataService";
import LiveMatchDetails from "../../components/MatchDetails/LiveMatchDetails";
import type { CricbuzzMatchDetailsResponse } from "../../components/types/CricbuzzLiveMatchInfo";


function MatchDetailsPage() {

  const { matchId } = useParams();

  const [matchDetails, setMatchDetails] =
    useState<CricbuzzMatchDetailsResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [activeTab, setActiveTab] =
    useState<MatchTab>("Live");


  useEffect(() => {

    const loadMatchDetails = async () => {

      if (!matchId) {
        setError("Match ID not found");
        setLoading(false);
        return;
      }

      try {

        setLoading(true);
        setError(null);
  console.log(matchId)
        const response = await getCricbuzzMatchInfo(
          Number(matchId)
        );

        setMatchDetails(response);

      } catch (error) {

        console.error(
          "Failed to load match details",
          error
        );

        setError("Failed to load match details");

      } finally {

        setLoading(false);

      }
    };


    loadMatchDetails();

  }, [matchId]);


  if (loading) {
    return <div>Loading match details...</div>;
  }


  if (error) {
    return <div>{error}</div>;
  }


  if (!matchDetails) {
    return <div>Match details not found.</div>;
  }


  return (

    <main className="match-details-page">

      <MatchHeader
        matchHeader={matchDetails.matchHeader}
      />


      <MatchSummary
        matchHeader={matchDetails.matchHeader}
        miniscore={matchDetails.miniscore}
      />


      <MatchTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />


      {/* LIVE TAB */}

      {activeTab === "Live" && (

        <section className="match-details-page__content">

        <div className="match-details-page__left">

            <LiveMatchDetails
                miniscore={matchDetails.miniscore}
                            />

            </div>


          <aside className="match-details-page__right">

            <MatchInfo
              matchHeader={matchDetails.matchHeader}
            />

          </aside>

        </section>

      )}


      {/* SCORECARD TAB */}

      {activeTab === "Scorecard" && (

        <section className="match-details-page__content">

          <div className="match-details-page__left">
            Scorecard coming next...
          </div>

        </section>

      )}


      {/* COMMENTARY TAB */}
{activeTab === "Commentary" && (

  <section className="match-details-page__content">

    <div className="match-details-page__left">

      <MatchCommentary
        commentary={matchDetails.matchCommentary}
      />

    </div>

    <aside className="match-details-page__right">

      <MatchInfo
        matchHeader={matchDetails.matchHeader}
      />

    </aside>

  </section>

)}


      {/* STATS TAB */}

    {activeTab === "Stats" && (
  <section className="match-details-page__content">

    <div className="match-details-page__left">
      <MatchStats miniscore={matchDetails.miniscore} />
    </div>

    <aside className="match-details-page__right">
      <MatchInfo matchHeader={matchDetails.matchHeader} />
    </aside>

  </section>
)}


      {/* SQUADS TAB */}

      {activeTab === "Squads" && (

        <section className="match-details-page__content">

          <div className="match-details-page__left">
            Squads coming next...
          </div>

        </section>

      )}

    </main>

  );

}

export default MatchDetailsPage;