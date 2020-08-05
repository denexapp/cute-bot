import { Command, CommandObject } from '.'
import getUserSettings from '../utils/database/getUserSettings'
import removeUserCallbackServer from '../utils/database/removeUserCallbackServer'
import messages from '../utils/messages'
import vk from '../utils/vk'
import generateSecret from '../utils/generateSecret'
import setUserSettings from '../utils/database/setUserSettings'

const command: Command = async (message, settings) => {
  const { peer_id: peerId, from_id: userId } = message

  const { callbackServerUrl } = await getUserSettings(userId)

  const callbackSecret = await generateSecret()

  await setUserSettings(userId, { callbackSecret })

  if (callbackServerUrl === null) {
    await vk.messagesSend(peerId, messages.callbackSecretResetKeyReset)
    return
  }

  const chatIds = await removeUserCallbackServer(userId)

  await vk.messagesSend(peerId, messages.callbackSecretResetKeyResetAndServerRemoved)

  for (const chatId of chatIds) {
    await vk.messagesSend(chatId, messages.callbackSecretResetKeyChatMessage)
  }
}

const callbackRemove: CommandObject = {
  command,
  worksInGroupChats: false,
  worksInPrivateMessages: true,
  isAdminCommand: false,
  description: messages.callbackSecretResetDescription
}

export default callbackRemove
