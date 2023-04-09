interface CryptoPrice {
  key: string;
  price: number;
  volume: number;
}

interface CryptoPricesResponse {
  data: CryptoPrice[];
}
