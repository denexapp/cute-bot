import { JsonDecoder } from 'ts.data.json'
import { UserSettings } from '../getUserSettings'

const userSettingsDecoder = JsonDecoder.object<UserSettings>({
  callbackSecret: JsonDecoder.string
}, 'User settings')

export default userSettingsDecoder
