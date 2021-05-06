import { query as q } from "faunadb";
import getDatabaseClient from "./utils/getDatabaseClient";

const removeUserWarningCount = async (
  peerId: number,
  userId: number
): Promise<void> => {
  const client = getDatabaseClient();

  await client.query(
    q.Update(q.Ref(q.Collection("chats-settings"), peerId), {
      data: {
        warnings: {
          [userId]: null,
        },
      },
    })
  );
};

export default removeUserWarningCount;
