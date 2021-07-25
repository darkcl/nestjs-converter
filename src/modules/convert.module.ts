import { DynamicModule, Module } from "@nestjs/common";
import { ConvertService } from "../services";

@Module({
  providers: [ConvertService],
  exports: [ConvertService],
})
export class ConvertModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: ConvertModule,
      providers: [ConvertService],
      exports: [ConvertService],
    };
  }
}
