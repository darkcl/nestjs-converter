export const getName = (input: NewableFunction | string) => {
  if (typeof input === "string" || input instanceof String) {
    return <string>input;
  }

  return input.name;
};
