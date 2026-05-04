import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav style={{
      background: 'rgba(8,8,8,0.95)',
      borderBottom: '1px solid #1a1a1a',
      padding: '0 24px',
      height: '54px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '32px' }}>
        <div style={{
          width: '30px', height: '30px', background: '#f59e0b',
          borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          ⚽
        </div>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#fff', letterSpacing: '2px' }}>
          Live<span style={{ color: '#f59e0b' }}>Score</span>
        </span>
      </div>

      <div style={{ display: 'flex', height: '100%', gap: '2px' }}>
        {[
          { path: '/', label: 'LIVE' },
          { path: '/jadwal', label: 'JADWAL' },
          { path: '/stats', label: 'STATISTIK' },
          { path: '/predict', label: 'PREDIKSI' },
        ].map(({ path, label }) => (
          <Link key={path} to={path} style={{
            padding: '0 14px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            fontWeight: '500',
            letterSpacing: '1px',
            textDecoration: 'none',
            color: location.pathname === path ? '#fff' : '#555',
            borderBottom: location.pathname === path ? '2px solid #f59e0b' : '2px solid transparent',
          }}>
            {label}
          </Link>
        ))}
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          background: '#ef4444', color: '#fff', fontSize: '10px',
          fontWeight: '700', padding: '3px 10px', borderRadius: '20px',
          letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px'
        }}>
          <div style={{ width: '5px', height: '5px', background: '#fff', borderRadius: '50%' }}></div>
          3 LIVE
        </div>
      </div>
    </nav>
  )
}