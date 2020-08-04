import { Command, CommandObject } from '.'
import setChatSettings from '../utils/database/setChatSettings'
import messages from '../utils/messages'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId, from_id: userId, date } = message

  if (settings.callbackServerChatId === null && settings.callbackServerUserId === null) {
    await vk.messagesSend(peerId, messages.callbackDisconnectNotConnected)
    return
  }

  await setChatSettings(peerId, { callbackServerChatId: null, callbackServerUserId: null })

  await vk.messagesSend(peerId, messages.callbackDisconnectSuccess)
}

const callbackDisconnect: CommandObject = {
  command,
  worksInGroupChats: true,
  worksInPrivateMessages: false,
  isAdminCommand: true,
  description: messages.callbackDisconnectDescription
}

export default callbackDisconnect
