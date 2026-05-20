const jadwalMatches = [
  { id: 1, home: 'Man United', away: 'Tottenham', tanggal: 'Sabtu, 10 Mei 2025', jam: '20:00', league: 'Premier League', leagueCode: 'ENG', homeLogo: { bg: '#2a0a0a', color: '#f87171', initials: 'MU' }, awayLogo: { bg: '#0a0a2a', color: '#93c5fd', initials: 'TOT' } },
  { id: 2, home: 'Atletico Madrid', away: 'Sevilla', tanggal: 'Sabtu, 10 Mei 2025', jam: '22:00', league: 'La Liga', leagueCode: 'ESP', homeLogo: { bg: '#2a0a0a', color: '#f87171', initials: 'ATM' }, awayLogo: { bg: '#1a0a00', color: '#fbbf24', initials: 'SEV' } },
  { id: 3, home: 'PSG', away: 'Lyon', tanggal: 'Minggu, 11 Mei 2025', jam: '21:00', league: 'Ligue 1', leagueCode: 'FRA', homeLogo: { bg: '#0a0a2a', color: '#60a5fa', initials: 'PSG' }, awayLogo: { bg: '#1a0a00', color: '#fbbf24', initials: 'LYO' } },
  { id: 4, home: 'AC Milan', away: 'Juventus', tanggal: 'Minggu, 11 Mei 2025', jam: '23:45', league: 'Serie A', leagueCode: 'ITA', homeLogo: { bg: '#2a0a0a', color: '#f87171', initials: 'ACM' }, awayLogo: { bg: '#111', color: '#e2e8f0', initials: 'JUV' } },
  { id: 5, home: 'Bayern Munich', away: 'RB Leipzig', tanggal: 'Senin, 12 Mei 2025', jam: '20:30', league: 'Bundesliga', leagueCode: 'GER', homeLogo: { bg: '#2a0a0a', color: '#f87171', initials: 'BAY' }, awayLogo: { bg: '#0a1a0a', color: '#4ade80', initials: 'RBL' } },
  { id: 6, home: 'Chelsea', away: 'Newcastle', tanggal: 'Senin, 12 Mei 2025', jam: '22:00', league: 'Premier League', leagueCode: 'ENG', homeLogo: { bg: '#14100a', color: '#fbbf24', initials: 'CHE' }, awayLogo: { bg: '#0a0a1a', color: '#93c5fd', initials: 'NEW' } },
]

function TeamLogo({ logo }) {
  return (
    <div style={{
      width: '32px', height: '32px', borderRadius: '50%',
      background: logo.bg, color: logo.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Bebas Neue', sans-serif", fontSize: '10px',
      letterSpacing: '1px', flexShrink: 0
    }}>
      {logo.initials}
    </div>
  )
}

function JadwalCard({ match }) {
  return (
    <div style={{
      background: '#0e0e0e', border: '1px solid #1a1a1a', borderTop: 'none',
      padding: '12px 12px', display: 'flex', alignItems: 'center', gap: '8px',
      cursor: 'pointer', transition: 'background 0.2s'
    }}
    onMouseEnter={e => e.currentTarget.style.background = '#131313'}
    onMouseLeave={e => e.currentTarget.style.background = '#0e0e0e'}
    >
      {/* Home Team */}
      <div style={{ flex: '2', display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
        <TeamLogo logo={match.homeLogo} />
        <span style={{ 
          fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', color: '#e2e8f0', letterSpacing: '1.5px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>
          {match.home}
        </span>
      </div>

      {/* Time */}
      <div style={{ textAlign: 'center', minWidth: '65px', flexShrink: 0 }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px',
          color: '#f59e0b', letterSpacing: '2px'
        }}>
          {match.jam}
        </div>
        <div style={{ fontSize: '7px', color: '#444', fontWeight: '700', letterSpacing: '1px', marginTop: '2px' }}>
          KICK OFF
        </div>
      </div>

      {/* Away Team */}
      <div style={{ flex: '2', display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', gap: '8px', minWidth: 0 }}>
        <TeamLogo logo={match.awayLogo} />
        <span style={{ 
          fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', color: '#e2e8f0', letterSpacing: '1.5px', textAlign: 'right',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>
          {match.away}
        </span>
      </div>
    </div>
  )
}

function LeagueGroup({ leagueCode, leagueName, matches }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px 8px 0 0', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '10px', color: '#f59e0b', letterSpacing: '1px' }}>{leagueCode}</span>
        <span style={{ fontSize: '9px', fontWeight: '600', color: '#555', letterSpacing: '1px', textTransform: 'uppercase' }}>{leagueName}</span>
      </div>
      {matches.map((match, i) => (
        <div key={match.id} style={{ borderRadius: i === matches.length - 1 ? '0 0 8px 8px' : '0', overflow: 'hidden' }}>
          <JadwalCard match={match} />
        </div>
      ))}
    </div>
  )
}

export default function Jadwal() {
  const groupByDate = jadwalMatches.reduce((acc, match) => {
    if (!acc[match.tanggal]) acc[match.tanggal] = {}
    if (!acc[match.tanggal][match.league]) acc[match.tanggal][match.league] = { code: match.leagueCode, matches: [] }
    acc[match.tanggal][match.league].matches.push(match)
    return acc
  }, {})

  return (
    <div style={{ background: '#080808', minHeight: '100vh', padding: '16px 12px' }}>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '2px', background: '#f59e0b' }}></div>
          <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '600', letterSpacing: '2px' }}>JADWAL PERTANDINGAN</span>
        </div>
        
        <div style={{ 
          fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: '#fff', letterSpacing: '2px', lineHeight: 1, marginBottom: '6px' 
        }}>
          Upcoming <span style={{ color: '#f59e0b' }}>Matches</span>
        </div>
        
        <div style={{ fontSize: '11px', color: '#555', fontStyle: 'italic', marginBottom: '20px', fontWeight: '300' }}>
          Jadwal pertandingan dari liga-liga top dunia
        </div>

        {/* List Matches */}
        {Object.entries(groupByDate).map(([tanggal, leagues]) => (
          <div key={tanggal} style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', color: '#fff', letterSpacing: '2px' }}>{tanggal}</span>
              <div style={{ flex: 1, height: '1px', background: '#1a1a1a', margin: '0 10px' }}></div>
            </div>
            {Object.entries(leagues).map(([league, data]) => (
              <LeagueGroup key={league} leagueCode={data.code} leagueName={league} matches={data.matches} />
            ))}
          </div>
        ))}

      </div>
    </div>
  )
}