export default function StatRow({ label, home, away }) {
  const getNumber = (val) => {
    if (typeof val === 'string') {
      return parseInt(val) || 0;
    }
    return val || 0;
  };

  const homeNum = getNumber(home);
  const awayNum = getNumber(away);
  const total = homeNum + awayNum;
  
  const homePercent = total > 0 ? (homeNum / total) * 100 : 50;
  const awayPercent = total > 0 ? (awayNum / total) * 100 : 50;

  return (
    <div className="stat-row">
      <div className="stat-label">{label}</div>
      <div className="stat-bar-container">
        <div className="stat-value">{home}</div>
        <div className="stat-bar">
          <div className="stat-bar-home" style={{ width: `${homePercent}%` }} />
          <div className="stat-bar-away" style={{ width: `${awayPercent}%` }} />
        </div>
        <div className="stat-value-right">{away}</div>
      </div>
    </div>
  );
}