import { Injectable } from "@nestjs/common";
import { ConversionDto } from "./dto/conversion.dto";
import { Currency } from "./enum/currency-enum";
import axios from "axios";

@Injectable()
export class CryptoConverterService {
  async convertCurrency(
    query: ConversionDto
  ): Promise<{ amount: number; from: string; to?: Currency; result: number }> {
    const CRYPTO_RANK_API = process.env.CRYPTO_RANK_URL;
    const { from, to = "eth", amount = 1 } = query;

    const cryptoPricesResponse = await axios.get<CryptoPricesResponse>(
      CRYPTO_RANK_API
    );

    const cryptoPrices = cryptoPricesResponse.data;
    const fromObj = cryptoPrices.data.find(
      (obj) => obj.key.toLowerCase() === from.toLowerCase()
    );
    const toObj = cryptoPrices.data.find(
      (obj) => obj.key.toLowerCase() === to.toLowerCase()
    );

    if (!fromObj || !toObj) {
      throw new Error("Указана неверная валюта");
    }

    const fromPrice = Number(fromObj.price);
    const toPrice = Number(toObj.price);

    const result = this.calculateConversion(fromPrice, toPrice, amount);
    const fixedResult = result; //toFixed(2);

    return { amount, from, to: to as Currency, result: fixedResult };
  }

  private calculateConversion(
    fromPrice: number,
    toPrice: number,
    amount: number
  ): number {
    const precision = Math.max(fromPrice, toPrice, amount);
    const multiplier = Math.pow(10, precision.toString().length);
    const fromPriceInt = Math.round(fromPrice * multiplier);
    const toPriceInt = Math.round(toPrice * multiplier);
    const amountInt = Math.round(amount * multiplier);
    const resultInt = (toPriceInt * amountInt) / fromPriceInt;
    const result = resultInt / multiplier;
    return result;
  }
}
