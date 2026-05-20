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
    },
    {
      id: 3,
      homeTeam: { name: "Barcelona", score: 4, logo: "🔵🔴", shortName: "BAR" },
      awayTeam: { name: "Real Madrid", score: 2, logo: "👑", shortName: "RMA" },
      league: "LA LIGA",
      status: "FT",
      minute: "90",
      date: "2025-05-11",
      stats: [
        { label: "Penguasaan Bola", home: "62%", away: "38%" },
        { label: "Tembakan", home: "16", away: "11" },
        { label: "Tembakan Tepat", home: "8", away: "5" },
        { label: "Umpan", home: "567", away: "398" },
        { label: "Akurasi Umpan", home: "91%", away: "84%" },
        { label: "Pelanggaran", home: "11", away: "15" },
        { label: "Kartu Kuning", home: "2", away: "4" },
        { label: "Kartu Merah", home: "0", away: "0" }
      ]
    }
  ],
  topPlayers: [
    { name: "Erling Haaland", team: "Man City", goals: 27, assists: 5 },
    { name: "Mohamed Salah", team: "Liverpool", goals: 22, assists: 11 },
    { name: "Ollie Watkins", team: "Aston Villa", goals: 19, assists: 12 },
    { name: "Cole Palmer", team: "Chelsea", goals: 22, assists: 9 },
    { name: "Bukayo Saka", team: "Arsenal", goals: 16, assists: 8 }
  ]
};

export default function Stats() {
  const [selectedMatch, setSelectedMatch] = useState(matchesData.matches[0]);
  const [activeTab, setActiveTab] = useState("team");

  // Fungsi untuk progress bar
  const getPercent = (homeVal, awayVal) => {
    const homeNum = parseInt(homeVal) || 0;
    const awayNum = parseInt(awayVal) || 0;
    const total = homeNum + awayNum;
    return total > 0 ? (homeNum / total) * 100 : 50;
  };

  const { homeTeam, awayTeam, league, status, minute, stats } = selectedMatch;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0a0a0a",
      padding: "16px 12px",
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        
        {/* Header - Responsive */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "white", marginBottom: "2px" }}>
            STATISTIK
          </h1>
          <p style={{ color: "#6b7280", fontSize: "12px" }}>
            Statistik pertandingan secara real-time
          </p>
        </div>

        {/* Dropdown Pilih Pertandingan */}
        <div style={{ marginBottom: "16px" }}>
          <select
            value={selectedMatch.id}
            onChange={(e) => {
              const match = matchesData.matches.find(m => m.id === parseInt(e.target.value));
              setSelectedMatch(match);
            }}
            style={{
              width: "100%",
              padding: "10px 12px",
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              color: "white",
              fontSize: "12px",
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

        {/* Tab Navigator - Responsive */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button
            onClick={() => setActiveTab("team")}
            style={{
              flex: 1,
              padding: "10px 8px",
              backgroundColor: activeTab === "team" ? "#3b82f6" : "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            📊 Statistik Tim
          </button>
          <button
            onClick={() => setActiveTab("players")}
            style={{
              flex: 1,
              padding: "10px 8px",
              backgroundColor: activeTab === "players" ? "#3b82f6" : "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            ⚽ Top Performers
          </button>
        </div>

        {/* Konten berdasarkan tab yang dipilih */}
        {activeTab === "team" ? (
          // ============ TAB STATISTIK TIM ============
          <div style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #2a2a2a"
          }}>
            
            {/* League Header */}
            <div style={{ padding: "10px 12px", borderBottom: "1px solid #2a2a2a" }}>
              <span style={{ fontSize: "10px", fontWeight: "600", color: "#fbbf24", letterSpacing: "1px" }}>
                {league}
              </span>
            </div>

            {/* Score Section - Responsive */}
            <div style={{ padding: "20px 12px", borderBottom: "1px solid #2a2a2a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: "32px", marginBottom: "6px" }}>{homeTeam.logo || "🏠"}</div>
                  <div style={{ fontWeight: "500", fontSize: "11px", color: "#9ca3af" }}>
                    {homeTeam.shortName || homeTeam.name}
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: "white", marginTop: "6px" }}>
                    {homeTeam.score}
                  </div>
                </div>

                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{
                    fontSize: "10px",
                    fontWeight: "600",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    backgroundColor: status === "LIVE" ? "#dc2626" : "#374151",
                    color: "white",
                  }}>
                    {status === "LIVE" ? `LIVE ${minute}'` : status}
                  </div>
                  <div style={{ color: "#4b5563", fontSize: "10px", marginTop: "4px" }}>VS</div>
                </div>

                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: "32px", marginBottom: "6px" }}>{awayTeam.logo || "✈️"}</div>
                  <div style={{ fontWeight: "500", fontSize: "11px", color: "#9ca3af" }}>
                    {awayTeam.shortName || awayTeam.name}
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: "white", marginTop: "6px" }}>
                    {awayTeam.score}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div style={{ padding: "16px", backgroundColor: "#111111" }}>
              <div style={{ fontSize: "10px", fontWeight: "600", color: "#6b7280", marginBottom: "16px", textAlign: "center" }}>
                STATISTIK PERTANDINGAN
              </div>

              {stats.map((stat, idx) => {
                const homeVal = stat.home.toString();
                const awayVal = stat.away.toString();
                const homePercent = getPercent(homeVal, awayVal);
                
                return (
                  <div key={idx} style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "10px", color: "#9ca3af", marginBottom: "4px", textAlign: "center" }}>
                      {stat.label}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "40px", textAlign: "right", fontSize: "11px", fontWeight: "500", color: "#e5e7eb" }}>
                        {homeVal}
                      </div>
                      <div style={{ flex: 1, display: "flex", height: "4px", borderRadius: "2px", overflow: "hidden", backgroundColor: "#2a2a2a" }}>
                        <div style={{ backgroundColor: "#3b82f6", width: `${homePercent}%` }} />
                        <div style={{ backgroundColor: "#ef4444", width: `${100 - homePercent}%` }} />
                      </div>
                      <div style={{ width: "40px", textAlign: "left", fontSize: "11px", fontWeight: "500", color: "#e5e7eb" }}>
                        {awayVal}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // ============ TAB TOP PERFORMERS - Responsive ============
          <div style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            border: "1px solid #2a2a2a",
            padding: "16px"
          }}>
            <div style={{ fontSize: "10px", fontWeight: "600", color: "#fbbf24", marginBottom: "14px" }}>
              ⚽ TOP SKOR & ASSIST
            </div>
            
            {/* Tabel Top Skor - Responsive */}
            <div style={{ marginBottom: "20px", overflowX: "auto" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "white", marginBottom: "10px" }}>
                Top Skor Sementara
              </div>
              <div style={{ minWidth: "280px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #2a2a2a", color: "#6b7280", fontSize: "10px" }}>
                  <span style={{ width: "35px" }}>#</span>
                  <span style={{ flex: 1 }}>Pemain</span>
                  <span style={{ width: "70px", textAlign: "center" }}>Tim</span>
                  <span style={{ width: "40px", textAlign: "right" }}>Gol</span>
                </div>
                {matchesData.topPlayers.map((player, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #2a2a2a", color: "#e5e7eb", fontSize: "12px" }}>
                    <span style={{ width: "35px", fontWeight: "600" }}>{idx + 1}</span>
                    <span style={{ flex: 1 }}>{player.name}</span>
                    <span style={{ width: "70px", textAlign: "center", fontSize: "10px", color: "#9ca3af" }}>{player.team}</span>
                    <span style={{ width: "40px", textAlign: "right", fontWeight: "bold", color: "#3b82f6" }}>{player.goals}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistik Tambahan */}
            <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#0f0f0f", borderRadius: "8px" }}>
              <div style={{ fontSize: "10px", color: "#6b7280", marginBottom: "6px" }}>
                RATA-RATA GOL PER PERTANDINGAN
              </div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
                3.2
              </div>
              <div style={{ fontSize: "10px", color: "#4b5563", marginTop: "2px" }}>
                Liga Inggris musim ini
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: "9px", color: "#4b5563", marginTop: "16px" }}>
          Data dummy untuk keperluan tampilan frontend
        </div>
      </div>
    </div>
  );
}