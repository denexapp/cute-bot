import makeRequestToCallback from "./utils/makeRequestToCallback";
import { JsonDecoder } from "ts.data.json";

export enum Status {
  Kicked = 0,
  UserIsAnAdmin = 1,
  NoUserInChat = 2,
}

type Result = {
  status: Status;
};

const decoder = JsonDecoder.object<Result>(
  {
    status: JsonDecoder.oneOf(
      [
        JsonDecoder.isExactly(0),
        JsonDecoder.isExactly(1),
        JsonDecoder.isExactly(2),
      ],
      "status"
    ),
  },
  "Connect decoder"
);

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
    decoder
  );

export default kick;
