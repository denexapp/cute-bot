import { Command, CommandObject } from '.'
import setChatSettings from '../utils/database/setChatSettings'
import phrase from '../utils/localization/phrase'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId, from_id: userId, date } = message

  if (settings.callbackServerChatId === null && settings.callbackServerUserId === null) {
    await vk.messagesSend(peerId, phrase('callbackDisconnect_notConnected'))
    return
  }

  await setChatSettings(peerId, { callbackServerChatId: null, callbackServerUserId: null })

  await vk.messagesSend(peerId, phrase('callbackDisconnect_success'))
}

const callbackDisconnect: CommandObject = {
  command,
  worksInGroupChats: true,
  worksInPrivateMessages: false,
  isAdminCommand: true,
  requiresCallbackServer: false,
  description: 'callbackDisconnect_description'
}

export default callbackDisconnect
