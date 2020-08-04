import { Command, CommandObject } from '.'
import getUserSettings from '../utils/database/getUserSettings'
import setUserSettings from '../utils/database/setUserSettings'
import generateSecret from '../utils/generateSecret'
import messages from '../utils/messages'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId, from_id: userId } = message

  const { callbackServerUrl } = await getUserSettings(userId)

  if (callbackServerUrl === null) {
    await vk.messagesSend(peerId, messages.callbackRemoveNotExist)
    return
  }

  await setUserSettings(userId, { callbackServerUrl: null, callbackSecret: await generateSecret() })

  await vk.messagesSend(peerId, messages.callbackRemoveMessage)
}

const callbackRemove: CommandObject = {
  command,
  worksInGroupChats: false,
  worksInPrivateMessages: true,
  isAdminCommand: false,
  description: messages.callbackRemoveDescription
}

export default callbackRemove
