export interface CryptoData {
  id: number;
  bitcoinPrice: number;
  marketCap: number;
  exchangeVolume: number;
  timestamp: string;
  currency: string;
  volumeChange24h: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  percentChange30d: number;
  percentChange60d: number;
  percentChange90d: number;
}

export const bitcoinTestData: CryptoData = {
  id: 1102,
  bitcoinPrice: 37470.71530294277,
  marketCap: 7.32481964286331E11,
  exchangeVolume: 2.1638438822287647E10,
  timestamp: "2023-11-20T21:08:00Z",
  currency: "USD",
  volumeChange24h: 92.8054,
  percentChange1h: -0.25499004,
  percentChange24h: 1.55719512,
  percentChange7d: 2.06886435,
  percentChange30d: 24.70172287,
  percentChange60d: 40.84620458,
  percentChange90d: 45.05354487
};