import parseNumber from "./parseNumber";
import { Err, Ok, JsonDecoder } from "ts.data.json";
import decode from "./decode";

interface Variables {
  groupId: number;
  secret: string;
  accessToken: string;
  confirmationKey: string;
  databaseSecret: string;
}

const stringToNumberDecoder = new JsonDecoder.Decoder<number>(
  (parameter: unknown) => {
    if (typeof parameter !== "string") {
      return new Err(`Can\'t parse "${parameter}" as number`);
    }
    try {
      const number = parseNumber(parameter);
      return new Ok(number);
    } catch {
      return new Err(`Can\'t parse "${parameter}" as number`);
    }
  }
);

const variablesDecoder = JsonDecoder.object<Variables>(
  {
    groupId: stringToNumberDecoder,
    secret: JsonDecoder.string,
    accessToken: JsonDecoder.string,
    confirmationKey: JsonDecoder.string,
    databaseSecret: JsonDecoder.string,
  },
  "Variables Decoder"
);

const values = process.env;

const variables = decode(values, variablesDecoder);

export default variables;
