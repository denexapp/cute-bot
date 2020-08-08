import { CallbackConversationCommand, CallbackConversationCommandObject } from '..'
import setChatSettings from '../../utils/database/setChatSettings'
import phrase from '../../utils/localization/phrase'
import vk from '../../utils/vk'

const command: CallbackConversationCommand = async (message, settings, { callbackServerUrl, callbackSecret, callbackServerChatId }) => {
  const { peer_id: peerId } = message

  await setChatSettings(peerId, { callbackServerChatId: null, callbackServerUserId: null })

  await vk.messagesSend(peerId, phrase('callbackDisconnect_success'))
}

const callbackDisconnect: CallbackConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: 'callbackDisconnect_description'
}

export default callbackDisconnect
