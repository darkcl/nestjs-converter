import { Injectable } from "@nestjs/common";
import { GlobalConverterRegistry } from "../converter";
import { getName } from "../utils";

type ConvertOpts = {
  source: any;
  from: NewableFunction | string;
  to: NewableFunction | string;
};

@Injectable()
export class ConvertService {
  public convert({ source, from, to }: ConvertOpts) {
    const convertFn = GlobalConverterRegistry.get({
      from: getName(from),
      to: getName(to),
    });

    if (!convertFn) throw new Error("Convert not found");

    return convertFn(source);
  }
}
