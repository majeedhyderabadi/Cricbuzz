import "./MatchGrid.css";
import MatchCard from "./MatchCard";
import type { Match } from "../types/Match";
import { getCricketMatch } from "../../services/MatchDataService";
import { useState,useEffect } from "react";

function MatchGrid() {

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

            <MatchCard Match ={match}/>
            

        </section>

    );

}


export default MatchGrid;