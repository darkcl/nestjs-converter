export interface Converter<S, T> {
  convert: (from: S) => T;
}
