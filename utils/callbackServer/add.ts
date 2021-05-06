import makeRequestToCallback from "./utils/makeRequestToCallback";
import { JsonDecoder } from "ts.data.json";

const add = async (url: string, secret: string) =>
  await makeRequestToCallback(
    url,
    "add",
    secret,
    null,
    JsonDecoder.isNull(null)
  );

export default add;
