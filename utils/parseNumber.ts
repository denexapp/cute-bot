import parseNumberSafe from "./parseNumberSafe";

const parseNumber = (string: string | undefined): number => {
  const result = parseNumberSafe(string);
  if (result.error) {
    throw new Error(result.message);
  }
  return result.value;
};

export default parseNumber;
