import React from 'react';
import './LiveStatDetails.css';

// Define the shape of a generic statistic
export interface SportStat {
  label: string;
  homeValue: number;
  awayValue: number;
  maxValue: number; // Used to calculate the bar percentage
}

interface LiveStatDetailsProps {
  // Match info
  matchStatus?: string;
  venue?: string;
  
  // Team info
  homeTeam?: string;
  awayTeam?: string;
  
  // Scores (generic - could be runs, goals, points)
  homeScore?: number;
  awayScore?: number;
  
  // Sub-scores (e.g., Cricket Wickets, Soccer Half-time, etc.)
  homeSubText?: string;
  awaySubText?: string;
  
  // REUSABLE STATS ARRAY
  stats?: SportStat[];
  
  // Flags
  isHomeActive?: boolean; // Highlights the home side if currently "batting/attacking"
  
  // Custom class names
  className?: string;
  
  // Click handlers
  onHomeClick?: (() => void) | null;
  onAwayClick?: (() => void) | null;
}

const LiveStatDetails: React.FC<LiveStatDetailsProps> = ({
  matchStatus = 'LIVE',
  venue = '1st Innings',
  
  homeTeam = 'Home',
  awayTeam = 'Away',
  
  homeScore = 0,
  awayScore = 0,
  
  homeSubText = '',
  awaySubText = '',
  
  stats = [], // Defaults to empty array if not provided
  
  isHomeActive = true,
  
  className = '',  

  onHomeClick = null,
  onAwayClick = null,
}) => {
  const getBarWidth = (val: number, max: number) => Math.min((val / max) * 100, 100);

  return (
    <div className={`live-stat-details ${className}`}>
      <div className="accent-border-left"></div>
      <div className="accent-border-right"></div>

      <div className="match-header">
        <span className="match-title">{matchStatus}</span>
        <span className="match-venue">{venue}</span>
      </div>

      <div className="teams-container">
        {/* Home Team */}
        <div 
          className={`team-section home-team ${isHomeActive ? 'active' : ''}`}
          onClick={onHomeClick || undefined}
          style={{ cursor: onHomeClick ? 'pointer' : 'default' }}
          role={onHomeClick ? 'button' : 'generic'}
        >
          <div className="team-header">
            <span className="team-name">{homeTeam}</span>
            <span className="team-label">HOME</span>
          </div>
          <div className="team-score">
            <span className="runs">{homeScore}</span>
            {homeSubText && (
              <div className="wickets-overs">
                <span className="wickets">{homeSubText}</span>
              </div>
            )}
          </div>
        </div>

        <div className="vs-divider" aria-hidden="true">
          <span>VS</span>
        </div>

        {/* Away Team */}
        <div 
          className={`team-section away-team ${!isHomeActive ? 'active' : ''}`}
          onClick={onAwayClick || undefined}
          style={{ cursor: onAwayClick ? 'pointer' : 'default' }}
          role={onAwayClick ? 'button' : 'generic'}
        >
          <div className="team-header">
            <span className="team-label">AWAY</span>
            <span className="team-name">{awayTeam}</span>
          </div>
          <div className="team-score">
            {awaySubText && (
              <div className="wickets-overs right-aligned">
                <span className="wickets">{awaySubText}</span>
              </div>
            )}
            <span className="runs">{awayScore}</span>
          </div>
        </div>
      </div>

      {/* Dynamically Rendered Stats Grid */}
      {stats.length > 0 && (
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-bar-wrapper">
                <span className="stat-value-left">{stat.homeValue}</span>
                <div className="stat-bar-track">
                  <div 
                    className="bar-fill bar-orange" 
                    style={{ width: `${getBarWidth(stat.homeValue, stat.maxValue)}%` }}
                  ></div>
                  <div 
                    className="bar-fill bar-blue" 
                    style={{ width: `${getBarWidth(stat.awayValue, stat.maxValue)}%` }}
                  ></div>
                </div>
                <span className="stat-value-right">{stat.awayValue}</span>
              </div>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveStatDetails;