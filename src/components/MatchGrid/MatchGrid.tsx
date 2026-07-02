
import "./MatchGrid.css";
import MatchCard from "./MatchCard";
import type { Match } from "../types/Match";
import { getCricketMatch } from "../../services/MatchDataService";
import { useState,useEffect } from "react";
import { matches } from "../Data/MatchesData";



function MatchGrid({ searchTerm = "" }) {

    const term = searchTerm.toLowerCase().trim();

    const filteredMatches = matches.filter(match =>
        
        match.sport.toLowerCase().includes(term) ||
        match.team2.toLowerCase().includes(term) ||
         match.team1.toLowerCase().includes(term)
        
    );

const [match, setMatch]= useState<Match | null>(null)

useEffect(()=>{
    loadmatch()
},[])

const loadmatch = async  () =>
    {
    const data= await getCricketMatch()
    console.log(data)
    setMatch(data)
    

}
    return (

        <section className="match-grid">

            {/* <MatchCard Match ={match}/> */}
            
            {filteredMatches.map((match) => (

                <MatchCard
                    key={match.id}
                    match={match}
                />

            ))}

        </section>

    );

}


export default MatchGrid;