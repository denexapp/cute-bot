import { Command, CommandObject } from '.'
import getUserSettings from '../utils/database/getUserSettings'
import messages from '../utils/messages'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId, from_id: userId } = message
  
  const { callbackSecret } = await getUserSettings(userId)

  const text = `${messages.callbackSecretGetMessage}: ${callbackSecret}\n\n${messages.callbackSecretGetMessageAttention}`

  await vk.messagesSend(peerId, text)
}

const callbackSecretGet: CommandObject = {
  command,
  worksInGroupChats: false,
  worksInPrivateMessages: true,
  isAdminCommand: false,
  description: messages.callbackSecretGetDescription
}

export default callbackSecretGet
