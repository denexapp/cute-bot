import makeRequestToCallback from "./utils/makeRequestToCallback";
import { JsonDecoder } from "ts.data.json";

const decoder = JsonDecoder.object(
  {
    peerId: JsonDecoder.number,
  },
  "Connect decoder"
);

const connect = async (url: string, secret: string, date: number) =>
  await makeRequestToCallback(url, "connect", secret, { date }, decoder);

export default connect;
