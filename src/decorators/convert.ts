import { Converter, GlobalConverterRegistry } from "../converter";

/**
 *
 * @param from - Convert from a class or type, if using a interface / type, this must be a string
 * @param to - Convert to a class or type, if using a interface / type, this must be a string
 */
export const Convert = (
  from: NewableFunction | string,
  to: NewableFunction | string
) => {
  return function _Convert<T extends { new (...args: any[]): {} }>(constr: T) {
    if (!constr.prototype["convert"])
      throw new Error(`${constr.name} does not implement function: convert`);

    GlobalConverterRegistry.register({
      from,
      to,
      convertFn: constr.prototype.convert,
    });

    return constr;
  };
};
