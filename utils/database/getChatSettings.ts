import { query as q } from "faunadb";
import { ActionlessModeName, CallbackModeName, ModeName } from "../../commands";
import { defaultWarningsLimit } from "../consts";
import chatSettingsDecoder from "./utils/chatSettingsDecoder";
import decodeDatabaseResponse from "./utils/decodeDatabaseResponse";
import getDatabaseClient from "./utils/getDatabaseClient";

export interface ChatSettings {
  actionlessModes: { [key in ActionlessModeName]: true | null };
  modes: { [key in ModeName]: true | null };
  callbackModes: { [key in CallbackModeName]: true | null };
  callbackServerUserId: null | number;
  callbackServerChatId: null | number;
  templates: {
    [name: string]: {
      message: string;
    } | null;
  };
  warnings: {
    [userId: string]: number;
  };
  warningsLimit: number;
  welcome: string | null;
}

const getDefaultSettings = (): ChatSettings => ({
  actionlessModes: {
    ignoreUnknownCommands: null,
    ignoreUsers: null,
    welcome: null,
  },
  modes: { echo: null },
  callbackModes: { stop: null, removeCommands: null, profanityFilter: null },
  callbackServerUserId: null,
  callbackServerChatId: null,
  templates: {},
  warnings: {},
  warningsLimit: defaultWarningsLimit,
  welcome: null,
});

const getChatSettings = async (peerId: number): Promise<ChatSettings> => {
  const client = getDatabaseClient();

  const settings = await client.query(
    q.If(
      q.Exists(q.Ref(q.Collection("chats-settings"), peerId)),
      q.Get(q.Ref(q.Collection("chats-settings"), peerId)),
      q.Create(q.Ref(q.Collection("chats-settings"), peerId), {
        data: getDefaultSettings(),
      })
    )
  );

  const decodedSettings = decodeDatabaseResponse(settings, chatSettingsDecoder);

  return decodedSettings;
};

export default getChatSettings;
