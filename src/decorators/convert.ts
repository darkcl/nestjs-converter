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
    const wrappedConstructor: any = class extends constr {
      constructor(...args: any[]) {
        super(...args);
        GlobalConverterRegistry.register({
          from,
          to,
          converter: <Converter>(<unknown>this),
        });
      }
    };

    Object.defineProperty(wrappedConstructor, "name", {
      value: constr.name,
      writable: false,
    });
    return wrappedConstructor;
  };
};
