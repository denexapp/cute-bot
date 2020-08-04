import { Command, CommandObject } from '.'
import connect from '../utils/callbackServer/connect'
import getUserSettings from '../utils/database/getUserSettings'
import setChatSettings from '../utils/database/setChatSettings'
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

  await setChatSettings(peerId, { callbackServerChatId, callbackServerUserId: userId })

  await vk.messagesSend(peerId, messages.callbackConnectSuccess)
}

const callbackConnect: CommandObject = {
  command,
  worksInGroupChats: true,
  worksInPrivateMessages: false,
  isAdminCommand: true,
  description: messages.callbackConnectDescription
}

export default callbackConnect
