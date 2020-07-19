import { JsonDecoder } from 'ts.data.json'
import { ChatSettings } from '../getSettings'

const chatSettingsDecoder = JsonDecoder.object<ChatSettings>({
  echo: JsonDecoder.boolean
}, 'Chat settings')

export default chatSettingsDecoder
