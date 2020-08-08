import { JsonDecoder } from 'ts.data.json'
import { ChatSettings } from '../getChatSettings'
import optionalDecoder from '../../optionalDecoder'

const chatSettingsDecoder = JsonDecoder.object<ChatSettings>({
  modes: JsonDecoder.object({
    echo: optionalDecoder(JsonDecoder.isExactly(true))
  }, 'Modes'),
  callbackModes: JsonDecoder.object({
    stop: optionalDecoder(JsonDecoder.isExactly(true))
  }, 'Callback modes'),
  callbackServerUserId: optionalDecoder(JsonDecoder.number),
  callbackServerChatId: optionalDecoder(JsonDecoder.number)
}, 'Chat settings')

export default chatSettingsDecoder
