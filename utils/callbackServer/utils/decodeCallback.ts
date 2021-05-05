import { JsonDecoder } from "ts.data.json";
import decode from "../../decode";
import { callbackServerName } from "../../consts";

interface Callback<T> {
  serverName: typeof callbackServerName;
  response: T;
}

const decodeCallback = <T>(data: unknown, decoder: JsonDecoder.Decoder<T>) => {
  const callbackDecoder = JsonDecoder.object<Callback<T>>(
    {
      serverName: JsonDecoder.isExactly(callbackServerName),
      response: decoder,
    },
    "Callback"
  );

  return decode(data, callbackDecoder);
};

export default decodeCallback;
