import { query as q } from "faunadb";
import chatSettingsDecoder from "./utils/chatSettingsDecoder";
import decodeDatabaseResponse from "./utils/decodeDatabaseResponse";
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
        q.LTE(q.Var("count"), 0),
        false,
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

  console.log(settings)

  // const decodedSettings = decodeDatabaseResponse(settings, chatSettingsDecoder);
  // const userWarningCount = decodedSettings.warnings[userId];

  return null;
};

export default decrementUserWarningCount;
