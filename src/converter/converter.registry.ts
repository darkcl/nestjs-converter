import { Converter } from "./converter";

type RegisterOpts = {
  from: string | NewableFunction;
  to: string | NewableFunction;
  converter: Converter;
};

type GetOpts = {
  from: string | NewableFunction;
  to: string | NewableFunction;
};

class ConverterRegistry {
  /**
   * Converter Will have keys of originate type (as string), and map to a map of designated type (as string)
   *
   * Example:
   *
   * ```
   * {
   *  "UserCreateDto": {
   *    "UserEntity": [Instance of Converter]
   *  }
   *  "MongoDocument": {
   *    "UserEntity": [Instance of Converter]
   *  }
   * }
   * ```
   */
  private _convertersMap = {};

  public register({ from, to, converter }: RegisterOpts) {
    const fromName = this.getName(from);
    const toName = this.getName(to);
    const fromMap = this._convertersMap[fromName];
    if (!fromMap) {
      this._convertersMap[fromName] = {};
      this._convertersMap[fromName][toName] = converter;
    } else {
      const toConverter = fromMap[toName];
      if (toConverter)
        throw new Error(
          `Converter for ${fromName} to ${toName} already existed`
        );

      fromMap[toName] = converter;
    }
  }

  public get({ from, to }: GetOpts): Converter {
    const fromName = this.getName(from);
    const toName = this.getName(to);
    const fromMap = this._convertersMap[fromName];
    if (!fromMap)
      throw new Error(`Converter for ${fromName} to ${toName} never exist`);

    const toConverter = this._convertersMap[toName];
    if (!toConverter)
      throw new Error(`Converter for ${fromName} to ${toName} never exist`);

    return toConverter;
  }

  private getName(input: string | NewableFunction): string {
    if (typeof input === "string" || input instanceof String) {
      return <string>input;
    }

    return input.name;
  }
}

export const GlobalConverterRegistry = new ConverterRegistry();
