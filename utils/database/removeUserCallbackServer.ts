import { query as q } from "faunadb";
import { JsonDecoder } from "ts.data.json";
import { limitOfConversationsForOneCallbackServer } from "../consts";
import { ChatSettings } from "./getChatSettings";
import { UserSettings } from "./getUserSettings";
import chatSettingsDecoder from "./utils/chatSettingsDecoder";
import decodeDatabaseResponse from "./utils/decodeDatabaseResponse";
import { Entity, entityDecoder } from "./utils/decodeEntity";
import getDatabaseClient from "./utils/getDatabaseClient";

const chatSettingsEntityArrayDecoder = JsonDecoder.array<Entity<ChatSettings>>(
  entityDecoder(chatSettingsDecoder),
  "ChatSettings Entity array decoder"
);

export const partialChatSettingsWithoutCallback: Partial<ChatSettings> = {
  callbackServerChatId: null,
  callbackServerUserId: null,
  callbackModes: {
    stop: null,
    removeCommands: null,
    profanityFilter: null,
  },
};

const removeUserCallbackServer = async (
  userId: number
): Promise<Array<Entity<ChatSettings>>> => {
  const client = getDatabaseClient();

  const newUserSettings: Partial<UserSettings> = {
    callbackServerUrl: null,
  };

  const chatSettingsArray = await client.query(
    q.Do(
      q.Update(q.Ref(q.Collection("users-settings"), userId), {
        data: newUserSettings,
      }),
      q.Map(
        q.Paginate(
          q.Match(q.Index("chats-by-callback-server-user-id"), userId),
          { size: limitOfConversationsForOneCallbackServer }
        ),
        q.Lambda(
          "ref",
          q.Let(
            {
              callbackModes: q.Get(q.Var("ref")),
            },
            q.Do(
              q.Update(q.Var("ref"), {
                data: partialChatSettingsWithoutCallback,
              }),
              q.Var("callbackModes")
            )
          )
        )
      )
    )
  );

  const decodedChatSettingsEntityArray = decodeDatabaseResponse(
    chatSettingsArray,
    chatSettingsEntityArrayDecoder
  );

  return decodedChatSettingsEntityArray;
};

export default removeUserCallbackServer;
