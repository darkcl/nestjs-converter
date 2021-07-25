import { getName } from "../utils";

type ConvertFn = (source: any) => any;

type RegisterOpts = {
  from: string | NewableFunction;
  to: string | NewableFunction;
  convertFn: (source: any) => any;
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

  public register({ from, to, convertFn }: RegisterOpts) {
    const fromName = getName(from);
    const toName = getName(to);
    const fromMap = this._convertersMap[fromName];
    if (!fromMap) {
      this._convertersMap[fromName] = {};
      this._convertersMap[fromName][toName] = convertFn;
    } else {
      const toConverter = fromMap[toName];
      if (toConverter)
        throw new Error(
          `Converter for ${fromName} to ${toName} already existed`
        );

      fromMap[toName] = convertFn;
    }
  }

  public get({ from, to }: GetOpts): ConvertFn {
    const fromName = getName(from);
    const toName = getName(to);

    const fromMap = this._convertersMap[fromName];
    if (!fromMap)
      throw new Error(`Converter for ${fromName} to ${toName} never exist`);

    const toConverter = this._convertersMap[fromName][toName];
    if (!toConverter)
      throw new Error(`Converter for ${fromName} to ${toName} never exist`);

    return toConverter;
  }
}

export const GlobalConverterRegistry = new ConverterRegistry();
