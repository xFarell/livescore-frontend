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
    <div style={{ background: '#080808', minHeight: '100vh', padding: '16px 12px' }}>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '2px', background: '#f59e0b' }}></div>
          <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '600', letterSpacing: '2px' }}>PREDIKSI PERTANDINGAN</span>
        </div>
        <div style={{ 
          fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: '#fff', letterSpacing: '2px', marginBottom: '20px', lineHeight: 1.2 
        }}>
          Siapa yang akan <span style={{ color: '#f59e0b' }}>menang?</span>
        </div>

        {/* Form Card */}
        <div style={{ 
          background: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '18px', marginBottom: '16px' 
        }}>
          {/* Team Selection - Responsive */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px', 
            marginBottom: '20px' 
          }}>
            
            {/* Home Team */}
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

            {/* VS */}
            <div style={{ 
              fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#333', letterSpacing: '2px', textAlign: 'center', margin: '-4px 0'
            }}>
              VS
            </div>

            {/* Away Team */}
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

          {/* Predict Button */}
          <button onClick={handlePredict} disabled={!home || !away || home === away || loading} style={{
            width: '100%', padding: '12px', background: (!home || !away || home === away) ? '#1a1a1a' : '#f59e0b',
            color: (!home || !away || home === away) ? '#333' : '#000',
            border: 'none', borderRadius: '8px', cursor: (!home || !away || home === away) ? 'not-allowed' : 'pointer',
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '2px',
            transition: 'all 0.2s'
          }}>
            {loading ? 'MENGANALISIS...' : 'PREDIKSI SEKARANG'}
          </button>
        </div>

        {/* Result Card */}
        {result && (
          <div style={{ background: '#0e0e0e', border: `1px solid ${colorMap[result.prediction]}44`, borderRadius: '12px', padding: '18px' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', color: '#555', letterSpacing: '2px', marginBottom: '6px' }}>HASIL PREDIKSI</div>
              <div style={{ 
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: colorMap[result.prediction], letterSpacing: '2px' 
              }}>
                {labelMap[result.prediction]}
              </div>
            </div>
            {[
              { label: home, value: result.homeWin, color: '#60a5fa' },
              { label: 'Seri', value: result.draw, color: '#f59e0b' },
              { label: away, value: result.awayWin, color: '#f87171' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: '500' }}>{item.label}</span>
                  <span style={{ 
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', color: item.color, letterSpacing: '1px' 
                  }}>{item.value}%</span>
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