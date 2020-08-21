import { ConversationCommand, ConversationCommandObject } from '..'
import setChatSettings from '../../utils/database/setChatSettings'
import phrase from '../../utils/localization/phrase'
import vk from '../../utils/vk'

const command: ConversationCommand = async (message, settings) => {
  const { peer_id: peerId } = message

  if (!settings.userCommands) {
    await vk.messagesSend(peerId, phrase('userCommandsDisable_failAlreadyDisabled'))
    return
  }

  await setChatSettings(peerId, {
    userCommands: false
  })

  await vk.messagesSend(peerId, phrase('userCommandsDisable_success'))
}

const userCommandsDisable: ConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: 'userCommandsDisable_description'
}

export default userCommandsDisable
