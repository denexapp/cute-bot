import { query as q } from "faunadb";
import { JsonDecoder } from "ts.data.json";
import { limitOfConversationsForOneCallbackServer } from "../consts";
import decode from "../decode";
import { ChatSettings } from "./getChatSettings";
import getDatabaseClient from "./utils/getDatabaseClient";

// Function returns number
// If result === -1, then callback server is connected to chat
// If result !== -1, then callback server can't be added because
// there are too much conversations for this callback server
// In this case result shows number of conversations with this callback server

const setChatCallbackServer = async (
  peerId: number,
  callbackServerUserId: number,
  callbackServerChatId: number
): Promise<number> => {
  const client = getDatabaseClient();

  const newSettings: Partial<ChatSettings> = {
    callbackServerChatId,
    callbackServerUserId,
  };

  const success = await client.query(
    q.Let(
      {
        count: q.Count(
          q.Match(
            q.Index("chats-by-callback-server-user-id"),
            callbackServerUserId
          )
        ),
      },
      q.If(
        q.GTE(q.Var("count"), limitOfConversationsForOneCallbackServer),
        q.Var("count"),
        q.Do(
          q.Update(q.Ref(q.Collection("chats-settings"), peerId), {
            data: newSettings,
          }),
          -1
        )
      )
    )
  );

  const decodedNumber = decode(success, JsonDecoder.number);

  return decodedNumber;
};

export default setChatCallbackServer;
