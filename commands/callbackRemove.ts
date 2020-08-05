import { Command, CommandObject } from '.'
import getUserSettings from '../utils/database/getUserSettings'
import removeUserCallbackServer from '../utils/database/removeUserCallbackServer'
import messages from '../utils/messages'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId, from_id: userId } = message

  const { callbackServerUrl } = await getUserSettings(userId)

  if (callbackServerUrl === null) {
    await vk.messagesSend(peerId, messages.callbackRemoveNotExist)
    return
  }

  const chatIds = await removeUserCallbackServer(userId)

  await vk.messagesSend(peerId, messages.callbackRemoveMessage)

  for (const chatId of chatIds) {
    await vk.messagesSend(chatId, messages.callbackRemoveChatMessage)
  }
}

const callbackRemove: CommandObject = {
  command,
  worksInGroupChats: false,
  worksInPrivateMessages: true,
  isAdminCommand: false,
  description: messages.callbackRemoveDescription
}

export default callbackRemove
