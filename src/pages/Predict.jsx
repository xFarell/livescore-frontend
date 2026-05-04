import { useState } from 'react'

const teams = ['Man City', 'Arsenal', 'Liverpool', 'Chelsea', 'Real Madrid', 'Barcelona', 'Bayern Munich', 'Dortmund']

export default function Predict() {
  const [home, setHome] = useState('')
  const [away, setAway] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePredict = () => {
    if (!home || !away || home === away) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      const rand = Math.random()
      const prediction = rand < 0.45 ? 'Home Win' : rand < 0.70 ? 'Away Win' : 'Draw'
      const homeWin = prediction === 'Home Win' ? Math.floor(Math.random() * 20 + 40) : Math.floor(Math.random() * 20 + 15)
      const awayWin = prediction === 'Away Win' ? Math.floor(Math.random() * 20 + 40) : Math.floor(Math.random() * 20 + 15)
      const draw = 100 - homeWin - awayWin
      setResult({ prediction, homeWin, awayWin, draw: Math.max(draw, 5) })
      setLoading(false)
    }, 1500)
  }

  const labelMap = { 'Home Win': `${home} Menang`, 'Away Win': `${away} Menang`, 'Draw': 'Seri' }
  const colorMap = { 'Home Win': '#60a5fa', 'Away Win': '#f87171', 'Draw': '#f59e0b' }

  return (
    <div style={{ background: '#080808', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '2px', background: '#f59e0b' }}></div>
          <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '600', letterSpacing: '3px' }}>PREDIKSI PERTANDINGAN</span>
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', color: '#fff', letterSpacing: '3px', marginBottom: '24px' }}>
          Siapa yang akan <span style={{ color: '#f59e0b' }}>menang?</span>
        </div>

        <div style={{ background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#555', letterSpacing: '1.5px', marginBottom: '6px', fontWeight: '600' }}>TIM HOME</div>
              <select value={home} onChange={e => setHome(e.target.value)} style={{
                width: '100%', background: '#141414', border: '1px solid #2a2a2a',
                borderRadius: '8px', padding: '10px 12px', color: home ? '#fff' : '#555',
                fontSize: '13px', fontFamily: "'Outfit', sans-serif", outline: 'none', cursor: 'pointer'
              }}>
                <option value=''>Pilih tim...</option>
                {teams.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#333', letterSpacing: '2px', textAlign: 'center', marginTop: '16px' }}>VS</div>
            <div>
              <div style={{ fontSize: '10px', color: '#555', letterSpacing: '1.5px', marginBottom: '6px', fontWeight: '600' }}>TIM AWAY</div>
              <select value={away} onChange={e => setAway(e.target.value)} style={{
                width: '100%', background: '#141414', border: '1px solid #2a2a2a',
                borderRadius: '8px', padding: '10px 12px', color: away ? '#fff' : '#555',
                fontSize: '13px', fontFamily: "'Outfit', sans-serif", outline: 'none', cursor: 'pointer'
              }}>
                <option value=''>Pilih tim...</option>
                {teams.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <button onClick={handlePredict} disabled={!home || !away || home === away || loading} style={{
            width: '100%', padding: '13px', background: (!home || !away || home === away) ? '#1a1a1a' : '#f59e0b',
            color: (!home || !away || home === away) ? '#333' : '#000',
            border: 'none', borderRadius: '8px', cursor: (!home || !away || home === away) ? 'not-allowed' : 'pointer',
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '3px',
            transition: 'all 0.2s'
          }}>
            {loading ? 'MENGANALISIS...' : 'PREDIKSI SEKARANG'}
          </button>
        </div>

        {result && (
          <div style={{ background: '#0e0e0e', border: `1px solid ${colorMap[result.prediction]}44`, borderRadius: '12px', padding: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: '#555', letterSpacing: '2px', marginBottom: '6px' }}>HASIL PREDIKSI</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: colorMap[result.prediction], letterSpacing: '3px' }}>
                {labelMap[result.prediction]}
              </div>
            </div>
            {[
              { label: home, value: result.homeWin, color: '#60a5fa' },
              { label: 'Seri', value: result.draw, color: '#f59e0b' },
              { label: away, value: result.awayWin, color: '#f87171' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>{item.label}</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: item.color, letterSpacing: '1px' }}>{item.value}%</span>
                </div>
                <div style={{ height: '4px', background: '#1a1a1a', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.value}%`, background: item.color, borderRadius: '2px', transition: 'width 0.8s' }} />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}