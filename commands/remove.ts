import { Command, CommandObject } from "."
import messages from '../utils/messages'
import messagesDelete from '../utils/vkApi/messagesDelete'

const command: Command = async (message, settings) => {
  await messagesDelete(message.id, true)
}

const echo: CommandObject = {
  command,
  isAdminCommand: false,
  description: messages.removeDescription
}

export default echo
