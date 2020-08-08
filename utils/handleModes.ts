import { callbackModes, modes } from '../commands'
import { ChatSettings } from './database/getChatSettings'
import { CallbackServerSettings } from './getCallbackServerSettings'
import phrase from './localization/phrase'
import vk from './vk'
import { Message } from './vkCallbackDecoders/messageNewDecoder'

const handleModes = async (message: Message, settings: ChatSettings, callbackServerSettings: CallbackServerSettings | null) => {
  const { peer_id: peerId } = message
  for (const [commandName, mode] of Object.entries(settings.callbackModes)) {
    if (mode === true) {
      if (callbackServerSettings === null) {
        await vk.messagesSend(peerId, phrase('common_modeCantBeAppliedWithoutCallbackServer', { commandName }))
        continue
      }
      await callbackModes[commandName].action(message, callbackServerSettings)
    }
  }

  for (const [commandName, mode] of Object.entries(settings.modes)) {
    if (mode === true) {
      await modes[commandName].action(message)
    }
  }
}

export default handleModes