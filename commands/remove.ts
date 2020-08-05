import { Command, CommandObject } from '.'
import messages from '../utils/messages'
import callbackRemove from '../utils/callbackServer/remove'
import getUserSettings from '../utils/database/getUserSettings'

const command: Command = async (message, settings) => {
  if (settings.callbackServerUserId === null || settings.callbackServerChatId === null) {
    throw new Error('Unexpected null values')
  }
  const { callbackSecret, callbackServerUrl } = await getUserSettings(settings.callbackServerUserId)
  if (callbackServerUrl === null) {
    throw new Error('Unexpected null values')
  }
  await callbackRemove(callbackServerUrl, callbackSecret, settings.callbackServerChatId, message.conversation_message_id)
}

const remove: CommandObject = {
  command,
  worksInGroupChats: true,
  worksInPrivateMessages: false,
  isAdminCommand: true,
  requiresCallbackServer: true,
  description: messages.removeDescription
}

export default remove
