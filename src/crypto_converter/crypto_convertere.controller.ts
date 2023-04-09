import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CryptoConverterService } from "./crypto_converter.service";
import { ConversionQueryDto } from "./dto/conversion-query.dto";
import { Currency } from "./enum/currency-enum";

@Controller()
@ApiTags("Currency")
export class CryptoConverterController {
  constructor(
    private readonly cryptoConverterService: CryptoConverterService
  ) {}

  @Get("/currency/convert")
  @ApiOperation({
    summary: "Convert one cryptocurrency to another",
  })
  @ApiQuery({
    name: "from",
    type: String,
    description: "Ключ монеты, из которой мы конвертируем",
    required: true,
  })
  @ApiQuery({
    name: "to",
    type: String,
    description: "Стоимость монеты, в которую мы конвертируем",
    required: false,
  })
  @ApiQuery({
    name: "amount",
    type: Number,
    description: "Количество монет, которые мы хотим конвертировать",
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "Результат конвертации",
  })
  async convertCurrency(
    @Query() query: ConversionQueryDto
  ): Promise<{ amount: number; from: string; to?: string; result: number }> {
    const { from, to, amount } = query;
    const result = await this.cryptoConverterService.convertCurrency({
      from,
      to: to as Currency,
      amount,
    });
    return result;
  }
}
