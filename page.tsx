"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10"
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main style={{ background: "black", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Topwallet Dashboard
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((coin) => (
          <div
            key={coin.id}
            style={{
              background: "#111",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>{coin.name}</strong>
              <div>{coin.symbol.toUpperCase()}</div>
            </div>

            <div>
              ${coin.current_price}
              <div
                style={{
                  color:
                    coin.price_change_percentage_24h >= 0
                      ? "lime"
                      : "red",
                }}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </div>
            </div>
          </div>
        ))
      )}
    </main>
  );
}