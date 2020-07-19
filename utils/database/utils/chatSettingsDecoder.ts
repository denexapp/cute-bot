import { JsonDecoder } from 'ts.data.json'
import { ChatSettings } from '../getChatSettings'

const chatSettingsDecoder = JsonDecoder.object<ChatSettings>({
  echo: JsonDecoder.boolean
}, 'Chat settings')

export default chatSettingsDecoder
