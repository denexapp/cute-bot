const parseNumberSafe = (
  string: string | undefined
):
  | {
      error: false;
      value: number;
    }
  | {
      error: true;
      message: string;
    } => {
  if (typeof string !== "string") {
    return {
      error: true,
      message: "Can't parse undefined parameter as number",
    };
  }
  const value = parseInt(string, 10);
  if (isNaN(value)) {
    return {
      error: true,
      message: `Can't parse "${string}" parameter as valid number`,
    };
  }
  return {
    error: false,
    value,
  };
};

export default parseNumberSafe;
