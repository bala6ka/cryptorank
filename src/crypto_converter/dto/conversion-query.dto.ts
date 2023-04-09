import { ApiProperty } from "@nestjs/swagger";
import { Currency } from "../enum/currency-enum";

export class ConversionQueryDto {
  @ApiProperty({
    description: "Source currency",
    example: Currency.BTC,
    enum: Currency,
  })
  from: Currency;

  @ApiProperty({
    description: "Target currency",
    example: Currency.ETH,
    enum: Currency,
  })
  to?: Currency = Currency.USDT;

  @ApiProperty({ description: "Amount to be converted", example: 1 })
  amount?: number;
}
