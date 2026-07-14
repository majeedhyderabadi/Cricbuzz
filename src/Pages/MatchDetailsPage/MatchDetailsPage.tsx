import "./MatchDetailsPage.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MatchHeader from "../../components/MatchDetails/MatchHeader";
import MatchSummary from "../../components/MatchDetails/MatchSummary";
import MatchStats from "../../components/MatchDetails/MatchStats";
import MatchTabs, {
  type MatchTab
} from "../../components/MatchDetails/MatchTabs";
import MatchInfo from "../../components/MatchDetails/MatchInfo";
import MatchCommentary from "../../components/MatchDetails/MatchCommentary";
import ScoreCard from "../../components/MatchDetails/ScoreCard";
import LiveMatchDetails from "../../components/MatchDetails/LiveMatchDetails";

import {
  getCricbuzzMatchInfo,
  getCricbuzzScorecard
} from "../../services/MatchDataService";

import type {
  CricbuzzMatchDetailsResponse
} from "../../components/types/CricbuzzLiveMatchInfo";

import type {
  CricbuzzScorecardResponse
} from "../../components/types/CricbuzzScorecard";


function MatchDetailsPage() {

  const { matchId } = useParams();

  const numericMatchId = Number(matchId);


  // =========================================================
  // STATE
  // =========================================================

  const [matchDetails, setMatchDetails] =
    useState<CricbuzzMatchDetailsResponse | null>(null);

  const [scorecard, setScorecard] =
    useState<CricbuzzScorecardResponse | null>(null);

  const [activeTab, setActiveTab] =
    useState<MatchTab>("Live");


  // Main match info state

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


  // Scorecard state

  const [scorecardLoading, setScorecardLoading] =
    useState(false);

  const [scorecardError, setScorecardError] =
    useState<string | null>(null);


  // =========================================================
  // LOAD MATCH DETAILS
  // =========================================================

  useEffect(() => {

    let ignore = false;

    const loadMatchDetails = async () => {

      if (!matchId || Number.isNaN(numericMatchId)) {

        setError("Invalid match ID");
        setLoading(false);

        return;
      }

      try {

        setLoading(true);
        setError(null);

        const response =
          await getCricbuzzMatchInfo(numericMatchId);


        // Prevent old request from updating state

        if (!ignore) {

          setMatchDetails(response);

        }

      } catch (error) {

        console.error(
          "Failed to load match details",
          error
        );


        if (!ignore) {

          setError(
            "Failed to load match details"
          );

        }

      } finally {

        if (!ignore) {

          setLoading(false);

        }

      }

    };


    loadMatchDetails();


    return () => {

      ignore = true;

    };

  }, [matchId, numericMatchId]);


  // =========================================================
  // LOAD SCORECARD
  // Only when Scorecard tab is opened
  // =========================================================

  useEffect(() => {

    // Don't call API until Scorecard tab is selected

    if (activeTab !== "Scorecard") {
      return;
    }


    // Already loaded — don't call again

    if (scorecard) {
      return;
    }


    // Invalid match ID

    if (!matchId || Number.isNaN(numericMatchId)) {
      return;
    }


    let ignore = false;


    const loadScorecard = async () => {

      try {

        setScorecardLoading(true);
        setScorecardError(null);


        const response =
          await getCricbuzzScorecard(numericMatchId);


        if (!ignore) {

          setScorecard(response);

        }

      } catch (error) {

        console.error(
          "Failed to load scorecard",
          error
        );


        if (!ignore) {

          setScorecardError(
            "Failed to load scorecard"
          );

        }

      } finally {

        if (!ignore) {

          setScorecardLoading(false);

        }

      }

    };


    loadScorecard();


    return () => {

      ignore = true;

    };

  }, [
    activeTab,
    matchId,
    numericMatchId,
    scorecard
  ]);


  // =========================================================
  // PAGE STATES
  // All hooks are ABOVE these returns
  // =========================================================

  if (loading) {

    return (
      <div className="match-details-page__state">
        Loading match details...
      </div>
    );

  }


  if (error) {

    return (
      <div className="match-details-page__state">
        {error}
      </div>
    );

  }


  if (!matchDetails) {

    return (
      <div className="match-details-page__state">
        Match details not found.
      </div>
    );

  }


  // =========================================================
  // TAB CONTENT
  // =========================================================

  const renderTabContent = () => {

    switch (activeTab) {


      // -------------------------------------------------------
      // LIVE
      // -------------------------------------------------------

      case "Live":

        return (

          <LiveMatchDetails
            miniscore={matchDetails.miniscore}
          />

        );


      // -------------------------------------------------------
      // SCORECARD
      // -------------------------------------------------------

      case "Scorecard":

        if (scorecardLoading) {

          return (
            <div className="match-details-page__state">
              Loading scorecard...
            </div>
          );

        }


        if (scorecardError) {

          return (
            <div className="match-details-page__state">
              {scorecardError}
            </div>
          );

        }


        if (!scorecard) {

          return (
            <div className="match-details-page__state">
              Scorecard not available.
            </div>
          );

        }


        return (

          <ScoreCard
            scorecards={scorecard.scoreCard}
          />

        );


      // -------------------------------------------------------
      // COMMENTARY
      // -------------------------------------------------------

      case "Commentary":

        return (

          <MatchCommentary
            commentary={
              matchDetails.matchCommentary
            }
          />

        );


      // -------------------------------------------------------
      // STATS
      // -------------------------------------------------------

      case "Stats":

        return (

          <MatchStats
            miniscore={matchDetails.miniscore}
          />

        );


      // -------------------------------------------------------
      // SQUADS
      // -------------------------------------------------------

      case "Squads":

        return (

          <div className="match-details-page__state">
            Squads coming next...
          </div>

        );


      default:

        return null;

    }

  };


  // =========================================================
  // UI
  // =========================================================

  return (

    <main className="match-details-page">


      <MatchHeader
        matchHeader={
          matchDetails.matchHeader
        }
      />


      <MatchSummary
        matchHeader={
          matchDetails.matchHeader
        }
        miniscore={
          matchDetails.miniscore
        }
      />


      <MatchTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />


      <section className="match-details-page__content">


        {/* LEFT SIDE - TAB CONTENT */}

        <div className="match-details-page__left">

          {renderTabContent()}

        </div>


        {/* RIGHT SIDE - COMMON MATCH INFO */}

        <aside className="match-details-page__right">

          <MatchInfo
            matchHeader={
              matchDetails.matchHeader
            }
          />

        </aside>


      </section>


    </main>

  );

}


export default MatchDetailsPage;