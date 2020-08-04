import { JsonDecoder } from 'ts.data.json'
import { ChatSettings } from '../getChatSettings'
import optionalDecoder from '../../optionalDecoder'

const chatSettingsDecoder = JsonDecoder.object<ChatSettings>({
  echo: JsonDecoder.boolean,
  callbackServerUserId: optionalDecoder(JsonDecoder.number),
  callbackServerChatId: optionalDecoder(JsonDecoder.number)
}, 'Chat settings')

export default chatSettingsDecoder
