import { Command, CommandObject } from '.'
import getUserSettings from '../utils/database/getUserSettings'
import messages from '../utils/messages'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId, from_id: userId } = message
  
  const { callbackSecret } = await getUserSettings(userId)

  const text = `${messages.callbackSecretMessage}: ${callbackSecret}\n\n${messages.callbackSecretMessageAttention}`

  await vk.messagesSend(peerId, text)
}

const callbackSecret: CommandObject = {
  command,
  worksInGroupChats: false,
  worksInPrivateMessages: true,
  isAdminCommand: false,
  description: messages.callbackSecretDescription
}

export default callbackSecret
