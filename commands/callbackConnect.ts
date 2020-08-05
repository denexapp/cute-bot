import { Command, CommandObject } from '.'
import connect from '../utils/callbackServer/connect'
import { limitOfConversationsForOneCallbackServer } from '../utils/consts'
import getUserSettings from '../utils/database/getUserSettings'
import setChatCallbackServer from '../utils/database/setChatCallbackServer'
import messages from '../utils/messages'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId, from_id: userId, date } = message

  const userSettings = await getUserSettings(userId)

  if (settings.callbackServerUserId === userId) {
    await vk.messagesSend(peerId, messages.callbackConnectSameServer)
    return
  }

  if (settings.callbackServerChatId !== null || settings.callbackServerUserId !== null) {
    await vk.messagesSend(peerId, messages.callbackConnectCallbackServerAlreadyConnected)
    return
  }

  if (userSettings.callbackServerUrl === null) {
    await vk.messagesSend(peerId, messages.callbackConnectNoCallbackServer)
    return
  }


  const { peerId: callbackServerChatId } = await connect(userSettings.callbackServerUrl, userSettings.callbackSecret, date)

  const result = await setChatCallbackServer(peerId, userId, callbackServerChatId)

  if (result !== -1) {
    const response = `${messages.callbackConnectTooMuchConversations}\n\n${messages.callbackConnectTooMuchConversationsAmount}: ${result}\n${messages.callbackConnectTooMuchConversationsLimit}: ${limitOfConversationsForOneCallbackServer}`
    await vk.messagesSend(peerId, response)
    return
  }

  await vk.messagesSend(peerId, messages.callbackConnectSuccess)
}

const callbackConnect: CommandObject = {
  command,
  worksInGroupChats: true,
  worksInPrivateMessages: false,
  isAdminCommand: true,
  requiresCallbackServer: false,
  description: messages.callbackConnectDescription
}

export default callbackConnect
