import { useState } from 'react';

// Data multiple matches
const matchesData = {
  matches: [
    {
      id: 1,
      homeTeam: { name: "Manchester City", score: 2, logo: "🔵", shortName: "MCI" },
      awayTeam: { name: "Arsenal", score: 1, logo: "🔴", shortName: "ARS" },
      league: "PREMIER LEAGUE",
      status: "LIVE",
      minute: "67",
      date: "2025-05-10",
      stats: [
        { label: "Penguasaan Bola", home: "58%", away: "42%" },
        { label: "Tembakan", home: "14", away: "6" },
        { label: "Tembakan Tepat", home: "7", away: "2" },
        { label: "Umpan", home: "512", away: "387" },
        { label: "Akurasi Umpan", home: "89%", away: "81%" },
        { label: "Pelanggaran", home: "9", away: "14" },
        { label: "Kartu Kuning", home: "2", away: "3" },
        { label: "Kartu Merah", home: "0", away: "0" }
      ]
    },
    {
      id: 2,
      homeTeam: { name: "Liverpool", score: 3, logo: "🔴", shortName: "LIV" },
      awayTeam: { name: "Chelsea", score: 1, logo: "🔵", shortName: "CHE" },
      league: "PREMIER LEAGUE",
      status: "FT",
      minute: "90",
      date: "2025-05-10",
      stats: [
        { label: "Penguasaan Bola", home: "55%", away: "45%" },
        { label: "Tembakan", home: "18", away: "9" },
        { label: "Tembakan Tepat", home: "9", away: "3" },
        { label: "Umpan", home: "498", away: "423" },
        { label: "Akurasi Umpan", home: "86%", away: "79%" },
        { label: "Pelanggaran", home: "12", away: "10" },
        { label: "Kartu Kuning", home: "3", away: "2" },
        { label: "Kartu Merah", home: "0", away: "1" }
      ]
    }
  ],
  // Data statistik pemain
  playerStats: [
    {
      id: 1,
      name: "Erling Haaland",
      team: "Manchester City",
      position: "Forward",
      goals: 27,
      assists: 5,
      matches: 28,
      minutes: 2250,
      yellowCards: 2,
      redCards: 0,
      manOfTheMatch: 8
    },
    {
      id: 2,
      name: "Mohamed Salah",
      team: "Liverpool",
      position: "Forward",
      goals: 22,
      assists: 11,
      matches: 29,
      minutes: 2410,
      yellowCards: 1,
      redCards: 0,
      manOfTheMatch: 7
    },
    {
      id: 3,
      name: "Ollie Watkins",
      team: "Aston Villa",
      position: "Forward",
      goals: 19,
      assists: 12,
      matches: 30,
      minutes: 2580,
      yellowCards: 3,
      redCards: 0,
      manOfTheMatch: 5
    },
    {
      id: 4,
      name: "Cole Palmer",
      team: "Chelsea",
      position: "Midfielder",
      goals: 22,
      assists: 9,
      matches: 27,
      minutes: 2280,
      yellowCards: 4,
      redCards: 0,
      manOfTheMatch: 6
    },
    {
      id: 5,
      name: "Bukayo Saka",
      team: "Arsenal",
      position: "Midfielder",
      goals: 16,
      assists: 8,
      matches: 26,
      minutes: 2150,
      yellowCards: 3,
      redCards: 0,
      manOfTheMatch: 4
    },
    {
      id: 6,
      name: "Phil Foden",
      team: "Manchester City",
      position: "Midfielder",
      goals: 14,
      assists: 9,
      matches: 27,
      minutes: 2190,
      yellowCards: 2,
      redCards: 0,
      manOfTheMatch: 5
    },
    {
      id: 7,
      name: "Dominic Solanke",
      team: "Bournemouth",
      position: "Forward",
      goals: 18,
      assists: 4,
      matches: 29,
      minutes: 2450,
      yellowCards: 4,
      redCards: 0,
      manOfTheMatch: 3
    },
    {
      id: 8,
      name: "Martin Ødegaard",
      team: "Arsenal",
      position: "Midfielder",
      goals: 8,
      assists: 9,
      matches: 27,
      minutes: 2280,
      yellowCards: 1,
      redCards: 0,
      manOfTheMatch: 3
    },
    {
      id: 9,
      name: "Darwin Nunez",
      team: "Liverpool",
      position: "Forward",
      goals: 11,
      assists: 8,
      matches: 26,
      minutes: 1780,
      yellowCards: 7,
      redCards: 1,
      manOfTheMatch: 2
    },
    {
      id: 10,
      name: "Rodri",
      team: "Manchester City",
      position: "Midfielder",
      goals: 7,
      assists: 5,
      matches: 26,
      minutes: 2250,
      yellowCards: 8,
      redCards: 0,
      manOfTheMatch: 4
    }
  ]
};

export default function Stats() {
  const [selectedMatch, setSelectedMatch] = useState(matchesData.matches[0]);
  const [activeTab, setActiveTab] = useState("team"); // "team", "players", "playerDetail"
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [sortBy, setSortBy] = useState("goals"); // goals, assists, matches
  const [selectedTeam, setSelectedTeam] = useState("all");

  // Fungsi untuk progress bar
  const getPercent = (homeVal, awayVal) => {
    const homeNum = parseInt(homeVal) || 0;
    const awayNum = parseInt(awayVal) || 0;
    const total = homeNum + awayNum;
    return total > 0 ? (homeNum / total) * 100 : 50;
  };

  // Sort players
  const getSortedPlayers = () => {
    let players = [...matchesData.playerStats];
    if (selectedTeam !== "all") {
      players = players.filter(p => p.team === selectedTeam);
    }
    players.sort((a, b) => b[sortBy] - a[sortBy]);
    return players;
  };

  // Get unique teams
  const teams = ["all", ...new Set(matchesData.playerStats.map(p => p.team))];

  const { homeTeam, awayTeam, league, status, minute, stats } = selectedMatch;

  if (activeTab === "playerDetail" && selectedPlayer) {
    // Detail Player View
    const p = selectedPlayer;
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", padding: "32px 16px", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button
            onClick={() => setActiveTab("players")}
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              padding: "8px 16px",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              marginBottom: "20px"
            }}
          >
            ← Kembali ke Daftar Pemain
          </button>

          <div style={{ backgroundColor: "#1a1a1a", borderRadius: "12px", border: "1px solid #2a2a2a", overflow: "hidden" }}>
            {/* Header Player */}
            <div style={{ padding: "24px", textAlign: "center", borderBottom: "1px solid #2a2a2a" }}>
              <div style={{ fontSize: "48px", marginBottom: "8px" }}>⚽</div>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "white", marginBottom: "4px" }}>{p.name}</h2>
              <p style={{ color: "#9ca3af", fontSize: "14px" }}>{p.team} • {p.position}</p>
            </div>

            {/* Stats Grid */}
            <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
              <div style={{ backgroundColor: "#0f0f0f", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#3b82f6" }}>{p.goals}</div>
                <div style={{ fontSize: "11px", color: "#6b7280" }}>GOL</div>
              </div>
              <div style={{ backgroundColor: "#0f0f0f", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#10b981" }}>{p.assists}</div>
                <div style={{ fontSize: "11px", color: "#6b7280" }}>ASSIST</div>
              </div>
              <div style={{ backgroundColor: "#0f0f0f", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#f59e0b" }}>{p.matches}</div>
                <div style={{ fontSize: "11px", color: "#6b7280" }}>PERTANDINGAN</div>
              </div>
              <div style={{ backgroundColor: "#0f0f0f", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#8b5cf6" }}>{p.manOfTheMatch}</div>
                <div style={{ fontSize: "11px", color: "#6b7280" }}>MOTM</div>
              </div>
            </div>

            {/* Additional Info */}
            <div style={{ padding: "24px", borderTop: "1px solid #2a2a2a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #2a2a2a" }}>
                <span style={{ color: "#9ca3af" }}>Menit Bermain</span>
                <span style={{ color: "white", fontWeight: "bold" }}>{p.minutes} menit</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #2a2a2a" }}>
                <span style={{ color: "#9ca3af" }}>Kartu Kuning</span>
                <span style={{ color: "#fbbf24", fontWeight: "bold" }}>{p.yellowCards}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                <span style={{ color: "#9ca3af" }}>Kartu Merah</span>
                <span style={{ color: "#ef4444", fontWeight: "bold" }}>{p.redCards}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0a0a0a",
      padding: "32px 16px",
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "white", marginBottom: "4px" }}>
            STATISTIK
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Statistik pertandingan & pemain secara real-time
          </p>
        </div>

        {/* Tab Navigator - 3 TABS */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <button
            onClick={() => setActiveTab("team")}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: activeTab === "team" ? "#3b82f6" : "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            📊 Statistik Tim
          </button>
          <button
            onClick={() => setActiveTab("players")}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: activeTab === "players" ? "#3b82f6" : "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            ⚽ Statistik Pemain
          </button>
        </div>

        {/* ============ TAB STATISTIK TIM ============ */}
        {activeTab === "team" && (
          <>
            {/* Dropdown Pilih Pertandingan */}
            <div style={{ marginBottom: "20px" }}>
              <select
                value={selectedMatch.id}
                onChange={(e) => {
                  const match = matchesData.matches.find(m => m.id === parseInt(e.target.value));
                  setSelectedMatch(match);
                }}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "14px",
                  cursor: "pointer"
                }}
              >
                {matchesData.matches.map(match => (
                  <option key={match.id} value={match.id}>
                    {match.homeTeam.name} vs {match.awayTeam.name} - {match.league}
                  </option>
                ))}
              </select>
            </div>

            <div style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #2a2a2a"
            }}>
              
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #2a2a2a" }}>
                <span style={{ fontSize: "11px", fontWeight: "600", color: "#fbbf24", letterSpacing: "1px" }}>
                  {league}
                </span>
              </div>

              <div style={{ padding: "24px 20px", borderBottom: "1px solid #2a2a2a" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: "40px", marginBottom: "8px" }}>{homeTeam.logo}</div>
                    <div style={{ fontWeight: "500", fontSize: "13px", color: "#9ca3af" }}>{homeTeam.shortName}</div>
                    <div style={{ fontSize: "36px", fontWeight: "700", color: "white", marginTop: "8px" }}>{homeTeam.score}</div>
                  </div>
                  <div style={{ textAlign: "center", padding: "0 16px" }}>
                    <div style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      backgroundColor: status === "LIVE" ? "#dc2626" : "#374151",
                      color: "white",
                    }}>
                      {status === "LIVE" ? `LIVE ${minute}'` : status}
                    </div>
                    <div style={{ color: "#4b5563", fontSize: "11px", marginTop: "6px" }}>VS</div>
                  </div>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: "40px", marginBottom: "8px" }}>{awayTeam.logo}</div>
                    <div style={{ fontWeight: "500", fontSize: "13px", color: "#9ca3af" }}>{awayTeam.shortName}</div>
                    <div style={{ fontSize: "36px", fontWeight: "700", color: "white", marginTop: "8px" }}>{awayTeam.score}</div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "20px", backgroundColor: "#111111" }}>
                <div style={{ fontSize: "11px", fontWeight: "600", color: "#6b7280", marginBottom: "20px" }}>
                  STATISTIK PERTANDINGAN
                </div>
                {stats.map((stat, idx) => {
                  const homeVal = stat.home.toString();
                  const awayVal = stat.away.toString();
                  const homePercent = getPercent(homeVal, awayVal);
                  return (
                    <div key={idx} style={{ marginBottom: "14px" }}>
                      <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "6px", textAlign: "center" }}>{stat.label}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "45px", textAlign: "right", fontSize: "12px", fontWeight: "500", color: "#e5e7eb" }}>{homeVal}</div>
                        <div style={{ flex: 1, display: "flex", height: "4px", borderRadius: "2px", overflow: "hidden", backgroundColor: "#2a2a2a" }}>
                          <div style={{ backgroundColor: "#3b82f6", width: `${homePercent}%` }} />
                          <div style={{ backgroundColor: "#ef4444", width: `${100 - homePercent}%` }} />
                        </div>
                        <div style={{ width: "45px", textAlign: "left", fontSize: "12px", fontWeight: "500", color: "#e5e7eb" }}>{awayVal}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ============ TAB STATISTIK PEMAIN ============ */}
        {activeTab === "players" && (
          <div style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            border: "1px solid #2a2a2a",
            padding: "20px"
          }}>
            
            {/* Filter Controls */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#0f0f0f",
                    border: "1px solid #2a2a2a",
                    borderRadius: "6px",
                    color: "white",
                    fontSize: "12px"
                  }}
                >
                  <option value="goals">Sort by: Goals</option>
                  <option value="assists">Sort by: Assists</option>
                  <option value="matches">Sort by: Matches</option>
                </select>

                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#0f0f0f",
                    border: "1px solid #2a2a2a",
                    borderRadius: "6px",
                    color: "white",
                    fontSize: "12px"
                  }}
                >
                  {teams.map(team => (
                    <option key={team} value={team}>
                      {team === "all" ? "All Teams" : team}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Players Table */}
            <div style={{ overflowX: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #2a2a2a", color: "#6b7280", fontSize: "11px", fontWeight: "600" }}>
                <span style={{ width: "40px" }}>#</span>
                <span style={{ flex: 2 }}>PEMAIN</span>
                <span style={{ flex: 1, textAlign: "center" }}>TIM</span>
                <span style={{ width: "50px", textAlign: "center" }}>GOL</span>
                <span style={{ width: "50px", textAlign: "center" }}>AST</span>
                <span style={{ width: "60px", textAlign: "center" }}>MOTM</span>
                <span style={{ width: "40px", textAlign: "center" }}></span>
              </div>

              {getSortedPlayers().map((player, idx) => (
                <div key={player.id} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #2a2a2a", color: "#e5e7eb", fontSize: "13px", alignItems: "center" }}>
                  <span style={{ width: "40px", color: "#6b7280" }}>{idx + 1}</span>
                  <span style={{ flex: 2, fontWeight: "500" }}>{player.name}</span>
                  <span style={{ flex: 1, textAlign: "center", fontSize: "11px", color: "#9ca3af" }}>{player.team}</span>
                  <span style={{ width: "50px", textAlign: "center", fontWeight: "bold", color: "#3b82f6" }}>{player.goals}</span>
                  <span style={{ width: "50px", textAlign: "center", fontWeight: "bold", color: "#10b981" }}>{player.assists}</span>
                  <span style={{ width: "60px", textAlign: "center", fontSize: "11px", color: "#f59e0b" }}>{player.manOfTheMatch}</span>
                  <button
                    onClick={() => {
                      setSelectedPlayer(player);
                      setActiveTab("playerDetail");
                    }}
                    style={{
                      width: "40px",
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      border: "none",
                      borderRadius: "4px",
                      color: "white",
                      fontSize: "10px",
                      cursor: "pointer"
                    }}
                  >
                    Detail
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div style={{ marginTop: "24px", padding: "16px", backgroundColor: "#0f0f0f", borderRadius: "8px" }}>
              <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "8px" }}>RINGKASAN STATISTIK PEMAIN</div>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}>
                    {matchesData.playerStats.reduce((sum, p) => sum + p.goals, 0)}
                  </div>
                  <div style={{ fontSize: "10px", color: "#4b5563" }}>Total Gol</div>
                </div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}>
                    {matchesData.playerStats.reduce((sum, p) => sum + p.assists, 0)}
                  </div>
                  <div style={{ fontSize: "10px", color: "#4b5563" }}>Total Assist</div>
                </div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}>
                    {matchesData.playerStats.length}
                  </div>
                  <div style={{ fontSize: "10px", color: "#4b5563" }}>Total Pemain</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: "10px", color: "#4b5563", marginTop: "20px" }}>
          Data dummy untuk keperluan tampilan frontend
        </div>
      </div>
    </div>
  );
}