import { ConversationCommand, ConversationCommandObject } from '..'
import setChatSettings from '../../utils/database/setChatSettings'
import phrase from '../../utils/localization/phrase'
import vk from '../../utils/vk'

const command: ConversationCommand = async (message, settings) => {
  const { peer_id: peerId } = message

  if (settings.userCanUseCommands) {
    await vk.messagesSend(peerId, phrase('userCommandsEnable_failAlreadyEnabled'))
    return
  }

  await setChatSettings(peerId, {
    userCanUseCommands: true
  })

  await vk.messagesSend(peerId, phrase('userCommandsEnable_success'))
}

const userCommandsEnable: ConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: 'userCommandsEnable_description'
}

export default userCommandsEnable
