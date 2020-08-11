import { callbackModes, modes } from '../commands'
import { ChatSettings } from './database/getChatSettings'
import { CallbackServerSettings } from './getCallbackServerSettings'
import phrase from './localization/phrase'
import vk from './vk'
import { Message } from './vkCallbackDecoders/messageNewDecoder'
import list from './localization/list'

const handleModes = async (
  message: Message,
  settings: ChatSettings,
  callbackServerSettings: CallbackServerSettings | null,
  botHasAdminRights: boolean
) => {
  const { peer_id: peerId } = message

  const modesThatCantWorkWithoutAdminRights: Array<string> = []

  if (callbackServerSettings === null) {
    const enabledCallbackModesNames = Object
      .entries(settings.callbackModes)
      .filter(([, mode]) => mode === true)
      .map(([name]) => name)

    if (enabledCallbackModesNames.length !== 0) {
      const modesNames = list(enabledCallbackModesNames)
      const modesNamesSlash = list(enabledCallbackModesNames.map(value => `/${value}`))
      const modesCount = enabledCallbackModesNames.length
      const text = phrase('common_modesCantBeAppliedWithoutCallbackServer', {
        modesCount,
        modesNames,
        modesNamesSlash
      })
  
      await vk.messagesSend(peerId, text)
    }
  } else {
    for (const [commandName, mode] of Object.entries(settings.callbackModes)) {
      if (mode === true) {
        const modeObject = callbackModes[commandName]
        if (modeObject.actionNeedsBotAdminRights && !botHasAdminRights) {
          modesThatCantWorkWithoutAdminRights.push(commandName)
        } else {
          await modeObject.action(message, callbackServerSettings)
        }
      }
    }
  }

  for (const [commandName, mode] of Object.entries(settings.modes)) {
    if (mode === true) {
      const modeObject = modes[commandName]
      if (modeObject.actionNeedsBotAdminRights && !botHasAdminRights) {
        modesThatCantWorkWithoutAdminRights.push(commandName)
      } else {
        await modeObject.action(message)
      }
    }
  }

  if (modesThatCantWorkWithoutAdminRights.length !== 0) {
    const modesNames = list(modesThatCantWorkWithoutAdminRights)
    const modesNamesSlash = list(modesThatCantWorkWithoutAdminRights.map(value => `/${value}`))
    const modesCount = modesThatCantWorkWithoutAdminRights.length
    const text = phrase('common_modesCantBeAppliedWithoutAdminRights', {
      modesCount,
      modesNames,
      modesNamesSlash
    })

    await vk.messagesSend(peerId, text)
  }
}

export default handleModes