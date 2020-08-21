import { JsonDecoder } from 'ts.data.json'
import optionalDecoder from '../../optionalDecoder'
import { ChatSettings } from '../getChatSettings'

const chatSettingsDecoder = JsonDecoder.object<ChatSettings>({
  modes: JsonDecoder.object({
    echo: optionalDecoder(JsonDecoder.isExactly(true)),
  }, 'Modes'),
  callbackModes: JsonDecoder.object({
    profanityFilter: optionalDecoder(JsonDecoder.isExactly(true)),
    stop: optionalDecoder(JsonDecoder.isExactly(true)),
  }, 'Callback modes'),
  callbackServerUserId: optionalDecoder(JsonDecoder.number),
  callbackServerChatId: optionalDecoder(JsonDecoder.number),
  userCommands: JsonDecoder.boolean
}, 'Chat settings')

export default chatSettingsDecoder
