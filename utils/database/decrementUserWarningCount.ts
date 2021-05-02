import { query as q } from "faunadb"
import { JsonDecoder } from 'ts.data.json'
import decode from '../decode'
import chatSettingsDecoder from "./utils/chatSettingsDecoder"
import getDatabaseClient from "./utils/getDatabaseClient"

const decrementUserWarningCount = async (
  peerId: number,
  userId: number
): Promise<number | null> => {
  const client = getDatabaseClient();

  const settings = await client.query(
    q.Let(
      {
        count: q.Select(
          ["data", "warnings", `${userId}`],
          q.Get(q.Ref(q.Collection("chats-settings"), peerId)),
          0
        ),
      },
      q.If(
        q.LTE(q.Var("count"), 0),
        null,
        q.Update(q.Ref(q.Collection("chats-settings"), peerId), {
          data: {
            warnings: {
              [userId]: q.Subtract(q.Var("count"), 1),
            },
          },
        })
      )
    )
  );

  const decodedSettings = decode(settings, JsonDecoder.nullable(chatSettingsDecoder));
  const userWarningCount = decodedSettings?.warnings[userId] ?? null;

  return userWarningCount;
};

export default decrementUserWarningCount;
