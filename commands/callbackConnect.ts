import { Command, CommandObject } from '.'
import connect from '../utils/callbackServer/connect'
import { limitOfConversationsForOneCallbackServer } from '../utils/consts'
import getUserSettings from '../utils/database/getUserSettings'
import setChatCallbackServer from '../utils/database/setChatCallbackServer'
import phrase from '../utils/localization/phrase'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId, from_id: userId, date } = message

  const userSettings = await getUserSettings(userId)

  if (settings.callbackServerUserId === userId) {
    await vk.messagesSend(peerId, phrase('callbackConnect_sameServer'))
    return
  }

  if (settings.callbackServerChatId !== null || settings.callbackServerUserId !== null) {
    await vk.messagesSend(peerId, phrase('callbackConnect_callbackServerAlreadyConnected'))
    return
  }

  if (userSettings.callbackServerUrl === null) {
    await vk.messagesSend(peerId, phrase('callbackConnect_noCallbackServer'))
    return
  }

  const { peerId: callbackServerChatId } = await connect(userSettings.callbackServerUrl, userSettings.callbackSecret, date)

  const result = await setChatCallbackServer(peerId, userId, callbackServerChatId)

  if (result !== -1) {
    const response = phrase('callbackConnect_tooMuchConversations', { amount: result, limit: limitOfConversationsForOneCallbackServer})
    await vk.messagesSend(peerId, response)
    return
  }

  await vk.messagesSend(peerId, phrase('callbackConnect_success'))
}

const callbackConnect: CommandObject = {
  command,
  worksInGroupChats: true,
  worksInPrivateMessages: false,
  isAdminCommand: true,
  requiresCallbackServer: false,
  description: 'callbackConnect_description'
}

export default callbackConnect
