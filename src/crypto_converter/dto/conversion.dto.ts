import { Currency } from "../enum/currency-enum";

export interface ConversionDto {
  from: string;
  to?: Currency;
  amount: number;
}
