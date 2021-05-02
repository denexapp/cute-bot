import { query as q } from "faunadb";
import { JsonDecoder } from "ts.data.json";
import decode from "../decode";
import chatSettingsDecoder from "./utils/chatSettingsDecoder";
import { databaseResponseDecoder } from "./utils/decodeDatabaseResponse";
import getDatabaseClient from "./utils/getDatabaseClient";

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
        q.GT(q.Var("count"), 1),
        q.Update(q.Ref(q.Collection("chats-settings"), peerId), {
          data: {
            warnings: {
              [userId]: q.Subtract(q.Var("count"), 1),
            },
          },
        }),
        q.If(
          q.Equals(q.Var("count"), 1),
          q.Update(q.Ref(q.Collection("chats-settings"), peerId), {
            data: {
              warnings: {
                [userId]: null,
              },
            },
          }),
          null
        )
      )
    )
  );

  const decodedSettings = decode(
    settings,
    JsonDecoder.nullable(databaseResponseDecoder(chatSettingsDecoder))
  );

  const userWarningCount = decodedSettings === null ? null : decodedSettings.data.warnings[userId] ?? 0;

  return userWarningCount;
};

export default decrementUserWarningCount;
