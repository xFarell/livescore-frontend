const dummyStats = {
  fixture: { home: 'Man City', away: 'Arsenal', homeGoals: 2, awayGoals: 1, minute: 67, league: 'Premier League' },
  stats: [
    { label: 'Penguasaan Bola', home: 58, away: 42, type: 'percent' },
    { label: 'Tembakan', home: 14, away: 8, type: 'number' },
    { label: 'Tembakan Tepat', home: 6, away: 3, type: 'number' },
    { label: 'Umpan', home: 512, away: 387, type: 'number' },
    { label: 'Akurasi Umpan', home: 89, away: 81, type: 'percent' },
    { label: 'Pelanggaran', home: 9, away: 14, type: 'number' },
    { label: 'Kartu Kuning', home: 1, away: 3, type: 'number' },
    { label: 'Sepak Pojok', home: 7, away: 3, type: 'number' },
  ]
}

function StatBar({ label, home, away, type }) {
  const total = home + away || 1
  const homePct = Math.round((home / total) * 100)
  const awayPct = 100 - homePct
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#60a5fa', letterSpacing: '1px' }}>
          {type === 'percent' ? `${home}%` : home}
        </span>
        <span style={{ fontSize: '11px', color: '#555', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', alignSelf: 'center' }}>{label}</span>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#f87171', letterSpacing: '1px' }}>
          {type === 'percent' ? `${away}%` : away}
        </span>
      </div>
      <div style={{ display: 'flex', height: '4px', borderRadius: '2px', overflow: 'hidden', background: '#1a1a1a' }}>
        <div style={{ width: `${homePct}%`, background: '#60a5fa', transition: 'width 0.5s' }} />
        <div style={{ width: `${awayPct}%`, background: '#f87171', transition: 'width 0.5s' }} />
      </div>
    </div>
  )
}

export default function Stats() {
  const { fixture, stats } = dummyStats
  return (
    <div style={{ background: '#080808', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '2px', background: '#f59e0b' }}></div>
          <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '600', letterSpacing: '3px' }}>STATISTIK PERTANDINGAN</span>
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', color: '#fff', letterSpacing: '3px', marginBottom: '20px' }}>
          {fixture.league}
        </div>

        <div style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#e2e8f0', letterSpacing: '2px' }}>{fixture.home}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0 20px' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '40px', color: '#fff', letterSpacing: '6px' }}>
                {fixture.homeGoals}–{fixture.awayGoals}
              </div>
              <span style={{ background: '#ef4444', color: '#fff', fontSize: '9px', padding: '2px 8px', borderRadius: '3px', fontWeight: '700' }}>LIVE {fixture.minute}'</span>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#e2e8f0', letterSpacing: '2px' }}>{fixture.away}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <div style={{ flex: 1, textAlign: 'center', padding: '4px 0', borderBottom: '2px solid #f59e0b' }}>
            <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '600', letterSpacing: '1px' }}>STATISTIK</span>
          </div>
        </div>

        <div style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#60a5fa', letterSpacing: '1px' }}>{fixture.home}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#f87171', letterSpacing: '1px' }}>{fixture.away}</span>
          </div>
          {stats.map((s, i) => <StatBar key={i} {...s} />)}
        </div>

      </div>
    </div>
  )
}