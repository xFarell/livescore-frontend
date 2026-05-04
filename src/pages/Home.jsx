const dummyMatches = [
  { id: 1, home: 'Man City', away: 'Arsenal', homeGoals: 2, awayGoals: 1, minute: 67, status: 'LIVE', league: 'Premier League', leagueCode: 'ENG', homeLogo: { bg: '#0d1f3c', color: '#60a5fa', initials: 'MC' }, awayLogo: { bg: '#2a0a0a', color: '#f87171', initials: 'ARS' } },
  { id: 2, home: 'Liverpool', away: 'Chelsea', homeGoals: 1, awayGoals: 1, minute: 45, status: 'LIVE', league: 'Premier League', leagueCode: 'ENG', homeLogo: { bg: '#0a1a0a', color: '#4ade80', initials: 'LIV' }, awayLogo: { bg: '#14100a', color: '#fbbf24', initials: 'CHE' } },
  { id: 3, home: 'Real Madrid', away: 'Barcelona', homeGoals: 0, awayGoals: 0, minute: 23, status: 'LIVE', league: 'La Liga', leagueCode: 'ESP', homeLogo: { bg: '#1a1200', color: '#fbbf24', initials: 'RMA' }, awayLogo: { bg: '#0d0a1f', color: '#a78bfa', initials: 'BAR' } },
  { id: 4, home: 'Bayern Munich', away: 'Dortmund', homeGoals: 3, awayGoals: 0, minute: 90, status: 'FT', league: 'Bundesliga', leagueCode: 'GER', homeLogo: { bg: '#1a0a0a', color: '#f87171', initials: 'BAY' }, awayLogo: { bg: '#111', color: '#333', initials: 'DOR' } },
]

function TeamLogo({ logo }) {
  return (
    <div style={{
      width: '30px', height: '30px', borderRadius: '50%',
      background: logo.bg, color: logo.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px',
      letterSpacing: '1px', flexShrink: 0
    }}>
      {logo.initials}
    </div>
  )
}

function MatchCard({ match }) {
  const isLive = match.status === 'LIVE'
  return (
    <div style={{
      background: '#0e0e0e', border: '1px solid #1a1a1a', borderTop: 'none',
      padding: '13px 14px', display: 'flex', alignItems: 'center', cursor: 'pointer'
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <TeamLogo logo={match.homeLogo} />
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: isLive ? '#e2e8f0' : '#333', letterSpacing: '1.5px' }}>
          {match.home}
        </span>
      </div>

      <div style={{ textAlign: 'center', minWidth: '80px', padding: '0 8px' }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px', color: isLive ? '#fff' : '#333', letterSpacing: '4px' }}>
          {match.homeGoals}–{match.awayGoals}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '2px' }}>
          {isLive ? (
            <>
              <span style={{ background: '#ef4444', color: '#fff', fontSize: '8px', padding: '1px 6px', borderRadius: '3px', fontWeight: '700', letterSpacing: '1px' }}>LIVE</span>
              <span style={{ color: '#444', fontSize: '10px' }}>{match.minute}'</span>
            </>
          ) : (
            <span style={{ color: '#333', fontSize: '10px', fontWeight: '700', letterSpacing: '1px' }}>FT</span>
          )}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', gap: '10px' }}>
        <TeamLogo logo={match.awayLogo} />
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: isLive ? '#e2e8f0' : '#333', letterSpacing: '1.5px', textAlign: 'right' }}>
          {match.away}
        </span>
      </div>
    </div>
  )
}

function LeagueGroup({ leagueCode, leagueName, matches }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px 8px 0 0', padding: '7px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', color: '#f59e0b', letterSpacing: '1px' }}>{leagueCode}</span>
        <span style={{ fontSize: '11px', fontWeight: '600', color: '#555', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{leagueName}</span>
        {matches.some(m => m.status === 'LIVE') && (
          <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#fff', fontSize: '8px', padding: '2px 7px', borderRadius: '3px', fontWeight: '700', letterSpacing: '1px' }}>LIVE</span>
        )}
      </div>
      {matches.map((match, i) => (
        <div key={match.id} style={{ borderRadius: i === matches.length - 1 ? '0 0 8px 8px' : '0', overflow: 'hidden' }}>
          <MatchCard match={match} />
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  const liveMatches = dummyMatches.filter(m => m.status === 'LIVE')
  const finishedMatches = dummyMatches.filter(m => m.status === 'FT')

  const groupByLeague = (matches) => {
    return matches.reduce((acc, match) => {
      if (!acc[match.league]) acc[match.league] = { code: match.leagueCode, matches: [] }
      acc[match.league].matches.push(match)
      return acc
    }, {})
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <div style={{ background: '#0a0a0a', padding: '32px 24px 24px', borderBottom: '1px solid #161616', position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '120px', color: '#111', position: 'absolute', top: '-10px', right: '-10px', letterSpacing: '8px', lineHeight: 1, userSelect: 'none' }}>LIVE</div>
        <div style={{ fontSize: '11px', fontWeight: '600', color: '#f59e0b', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '2px', background: '#f59e0b' }}></div>
          Malam ini
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '56px', color: '#fff', letterSpacing: '3px', lineHeight: 1, marginBottom: '6px' }}>
          Skor <span style={{ color: '#f59e0b' }}>Real-Time</span><br />Sepak Bola
        </div>
        <div style={{ fontSize: '13px', color: '#555', fontStyle: 'italic', marginBottom: '20px', fontWeight: '300' }}>
          Update otomatis setiap 60 detik dari seluruh liga dunia
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[{ num: liveMatches.length, label: 'Live Sekarang', gold: true }, { num: dummyMatches.length, label: 'Pertandingan Hari Ini' }, { num: 5, label: 'Liga Dipantau' }].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: '24px' }}>
              {i > 0 && <div style={{ width: '1px', background: '#1e1e1e' }}></div>}
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: s.gold ? '#f59e0b' : '#fff', letterSpacing: '2px', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: '10px', color: '#444', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '2px' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#fff', letterSpacing: '3px' }}>SEDANG BERLANGSUNG</span>
          <div style={{ flex: 1, height: '1px', background: '#1a1a1a', margin: '0 12px' }}></div>
        </div>
        {Object.entries(groupByLeague(liveMatches)).map(([league, data]) => (
          <LeagueGroup key={league} leagueCode={data.code} leagueName={league} matches={data.matches} />
        ))}

        {finishedMatches.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', margin: '18px 0 12px' }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#fff', letterSpacing: '3px' }}>SELESAI</span>
              <div style={{ flex: 1, height: '1px', background: '#1a1a1a', margin: '0 12px' }}></div>
            </div>
            {Object.entries(groupByLeague(finishedMatches)).map(([league, data]) => (
              <LeagueGroup key={league} leagueCode={data.code} leagueName={league} matches={data.matches} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}