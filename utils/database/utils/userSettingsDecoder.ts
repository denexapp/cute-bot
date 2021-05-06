import { JsonDecoder } from "ts.data.json";
import { UserSettings } from "../getUserSettings";
import optionalDecoder from "../../optionalDecoder";

const userSettingsDecoder = JsonDecoder.object<UserSettings>(
  {
    callbackSecret: JsonDecoder.string,
    callbackServerUrl: optionalDecoder(JsonDecoder.string),
  },
  "User settings"
);

export default userSettingsDecoder;
