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
    q.Update(q.Ref(q.Collection("chats-settings"), peerId), {
      data: {
        warnings: {
          [userId]: q.Add(
            q.Select(
              ["data", "warnings", `${userId}`],
              q.Get(q.Ref(q.Collection("chats-settings"), peerId)),
              0
            ),
            1
          ),
        },
      },
    })
  );

  const decodedSettings = decodeDatabaseResponse(settings, chatSettingsDecoder);
  const userWarningCount = decodedSettings.warnings[userId];

  return userWarningCount;
};

export default incrementUserWarningCount;
