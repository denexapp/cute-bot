import { query as q } from "faunadb";
import chatSettingsDecoder from "./utils/chatSettingsDecoder";
import decodeDatabaseResponse from "./utils/decodeDatabaseResponse";
import getDatabaseClient from "./utils/getDatabaseClient";

const incrementUserWarningCount = async (
  peerId: number,
  userId: number
): Promise<number> => {
  const client = getDatabaseClient();

  const settings = await client.query(
    q.Do(
      q.Let(q.Ref(q.Collection("chats-settings"), peerId), "chat-settings-ref"),
      q.Update(q.Var("chat-settings-ref"), {
        data: {
          warnings: {
            [userId]: q.Add(
              q.Select(
                ["data", "warnings", userId],
                q.Get(q.Var("chat-settings-ref")),
                0
              ),
              1
            ),
          },
        },
      })
    )
  );

  const decodedSettings = decodeDatabaseResponse(settings, chatSettingsDecoder);
  const userWarningCount = decodedSettings.warnings[userId];

  return userWarningCount;
};

export default incrementUserWarningCount;
