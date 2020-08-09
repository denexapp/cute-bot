import { CallbackConversationCommand, CallbackConversationCommandObject } from '..'
import { partialChatSettingsWithoutCallback } from '../../utils/database/removeUserCallbackServer'
import setChatSettings from '../../utils/database/setChatSettings'
import phrase from '../../utils/localization/phrase'
import vk from '../../utils/vk'
import list from '../../utils/localization/list'

const command: CallbackConversationCommand = async (message, settings, callbackServerSettings) => {
  const { peer_id: peerId } = message

  const disabledCallbackModesNames = Object
    .entries(settings.callbackModes)
    .filter(([, mode]) => mode === true)
    .map(([name]) => name)

  await setChatSettings(peerId, partialChatSettingsWithoutCallback)

  const modesNames = list(disabledCallbackModesNames)
  const modesCount = disabledCallbackModesNames.length

  await vk.messagesSend(peerId, phrase('callbackDisconnect_successWithModes', {
    modesNames,
    modesCount
  }))
}

const callbackDisconnect: CallbackConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: 'callbackDisconnect_description'
}

export default callbackDisconnect
