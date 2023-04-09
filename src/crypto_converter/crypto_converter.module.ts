import { Module } from "@nestjs/common";
import { CryptoConverterService } from "./crypto_converter.service";
import { CryptoConverterController } from "./crypto_convertere.controller";

@Module({
  controllers: [CryptoConverterController],
  providers: [CryptoConverterService],
})
export class CryptoConverterModule {}
