import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CryptoConverterModule } from "./crypto_converter/crypto_converter.module";

@Module({
  imports: [ConfigModule.forRoot(), CryptoConverterModule],
})
export class AppModule {}
