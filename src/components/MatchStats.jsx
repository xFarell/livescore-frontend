import StatRow from './StatRow';

export default function MatchStats({ data }) {
  const { homeTeam, awayTeam, league, status, minute, stats } = data;

  return (
    <div className="match-card">
      
      <div className="league-header">
        <span>{league}</span>
      </div>

      <div className="score-section">
        <div className="score-row">
          
          <div className="team">
            <div className="team-logo">{homeTeam.logo || "🏠"}</div>
            <div className="team-name">{homeTeam.name}</div>
            <div className="team-score">{homeTeam.score}</div>
          </div>

          <div className="status-box">
            <div className={status === 'LIVE' ? 'status-live animate-pulse' : 'status-ft'}>
              {status === 'LIVE' ? `LIVE ${minute}'` : status}
            </div>
            <div className="vs-text">VS</div>
          </div>

          <div className="team">
            <div className="team-logo">{awayTeam.logo || "✈️"}</div>
            <div className="team-name">{awayTeam.name}</div>
            <div className="team-score">{awayTeam.score}</div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-title-row">
          <div className="stats-title">STATISTIK PERTANDINGAN</div>
          <div className="stats-team-label">
            <span className="home">{homeTeam.shortName || homeTeam.name}</span>
            <span style={{ color: '#9ca3af' }}>|</span>
            <span className="away">{awayTeam.shortName || awayTeam.name}</span>
          </div>
        </div>
        
        {stats.map((stat, idx) => (
          <StatRow key={idx} label={stat.label} home={stat.home} away={stat.away} />
        ))}
      </div>
    </div>
  );
}