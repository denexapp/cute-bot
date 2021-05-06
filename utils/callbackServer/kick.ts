import makeRequestToCallback from "./utils/makeRequestToCallback";
import { JsonDecoder } from "ts.data.json";

const kick = async (
  url: string,
  secret: string,
  chatId: number,
  userId: number
) =>
  await makeRequestToCallback(
    url,
    "kick",
    secret,
    {
      chatId,
      userId,
    },
    JsonDecoder.isNull(null)
  );

export default kick;
