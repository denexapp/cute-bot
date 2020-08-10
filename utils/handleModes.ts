import { callbackModes, modes } from '../commands'
import { ChatSettings } from './database/getChatSettings'
import { CallbackServerSettings } from './getCallbackServerSettings'
import phrase from './localization/phrase'
import vk from './vk'
import { Message } from './vkCallbackDecoders/messageNewDecoder'
import list from './localization/list'

const handleModes = async (message: Message, settings: ChatSettings, callbackServerSettings: CallbackServerSettings | null) => {
  const { peer_id: peerId } = message

  if (callbackServerSettings === null) {
    const disabledCallbackModesNames = Object
      .entries(settings.callbackModes)
      .filter(([, mode]) => mode === true)
      .map(([name]) => name)

    const modesNames = list(disabledCallbackModesNames)
    const modesNamesSlash = list(disabledCallbackModesNames.map(value => `/${value}`))
    const modesCount = disabledCallbackModesNames.length
    const text = phrase('common_modesCantBeAppliedWithoutCallbackServer', {
      modesCount,
      modesNames,
      modesNamesSlash
    })

    await vk.messagesSend(peerId, text)
  } else {
    for (const [commandName, mode] of Object.entries(settings.callbackModes)) {
      if (mode === true) {
        await callbackModes[commandName].action(message, callbackServerSettings)
      }
    }
  }

  for (const [commandName, mode] of Object.entries(settings.modes)) {
    if (mode === true) {
      await modes[commandName].action(message)
    }
  }
}

export default handleModes