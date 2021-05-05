import { JsonDecoder } from "ts.data.json";
import { defaultWarningsLimit } from "../../consts";
import optionalDecoder from "../../optionalDecoder";
import { ChatSettings } from "../getChatSettings";

const chatSettingsDecoder = JsonDecoder.object<ChatSettings>(
  {
    actionlessModes: JsonDecoder.object(
      {
        ignoreUnknownCommands: optionalDecoder(JsonDecoder.isExactly(true)),
        ignoreUsers: optionalDecoder(JsonDecoder.isExactly(true)),
      },
      "Actionless modes"
    ),
    modes: JsonDecoder.object(
      {
        echo: optionalDecoder(JsonDecoder.isExactly(true)),
      },
      "Modes"
    ),
    callbackModes: JsonDecoder.object(
      {
        profanityFilter: optionalDecoder(JsonDecoder.isExactly(true)),
        removeCommands: optionalDecoder(JsonDecoder.isExactly(true)),
        stop: optionalDecoder(JsonDecoder.isExactly(true)),
      },
      "Callback modes"
    ),
    callbackServerUserId: optionalDecoder(JsonDecoder.number),
    callbackServerChatId: optionalDecoder(JsonDecoder.number),
    templates: JsonDecoder.dictionary(
      JsonDecoder.object(
        {
          message: JsonDecoder.string,
        },
        "Template"
      ),
      "Templates"
    ),
    warnings: JsonDecoder.oneOf(
      [
        JsonDecoder.dictionary(JsonDecoder.number, "Warnings"),
        JsonDecoder.isUndefined({}),
      ],
      "Warnings"
    ),
    warningsLimit: JsonDecoder.oneOf(
      [JsonDecoder.number, JsonDecoder.isUndefined(defaultWarningsLimit)],
      "Warnings limit"
    ),
  },
  "Chat settings"
);

export default chatSettingsDecoder;
