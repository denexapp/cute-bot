import { query as q } from "faunadb";
import generateSecret from "../generateSecret";
import decodeDatabaseResponse from "./utils/decodeDatabaseResponse";
import getDatabaseClient from "./utils/getDatabaseClient";
import userSettingsDecoder from "./utils/userSettingsDecoder";

export interface UserSettings {
  callbackSecret: string;
  callbackServerUrl: string | null;
}

const getDefaultSettings = async (): Promise<UserSettings> => ({
  callbackSecret: await generateSecret(),
  callbackServerUrl: null,
});

const getUserSettings = async (userId: number): Promise<UserSettings> => {
  const client = getDatabaseClient();

  const settings = await client.query(
    q.If(
      q.Exists(q.Ref(q.Collection("users-settings"), userId)),
      q.Get(q.Ref(q.Collection("users-settings"), userId)),
      q.Create(q.Ref(q.Collection("users-settings"), userId), {
        data: await getDefaultSettings(),
      })
    )
  );

  const decodedSettings = decodeDatabaseResponse(settings, userSettingsDecoder);

  return decodedSettings;
};

export default getUserSettings;
