import "./MatchDetailsPage.css";
import MatchHeader from "../../components/MatchDetails/MatchHeader";
import MatchSummary from "../../components/MatchDetails/MatchSummary";
import MatchTabs from "../../components/MatchDetails/MatchTabs";
import ScoreCard from "../../components/MatchDetails/ScoreCard";
import MatchInfo from "../../components/MatchDetails/MatchInfo";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { getMatchDetails } from "../../services/MatchDataService";
import type { MatchDetailsResponse } from "../../components/types/Matches";

function MatchDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [match, setMatch] = useState<MatchDetailsResponse["data"] | null>(null);

  useEffect(() => {
    const loadMatchDetails = async () => {
      if (!id) return;

      try {
        const response = await getMatchDetails(id);
        setMatch(response.data);
      } catch (error) {
        console.error("Failed to load match details", error);
      }
    };

    loadMatchDetails();
  }, [id]);
    console.log(match)
  if (!match) {
    return <h2>Loading...</h2>;
  }
    return (
        
        <main className="match-details-page">

            <MatchHeader match={match} />

            <MatchSummary match={match} />

            <MatchTabs activeTab={""} />

            <section className="match-details-page__content">

                <div className="match-details-page__left">

                  <ScoreCard scorecards={match.scorecard} />

                  

                </div>

                <aside className="match-details-page__right">

                   <MatchInfo match={match} />

                </aside>

            </section>

        </main>

    );

}

export default MatchDetailsPage;