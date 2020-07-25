import { Command, CommandObject } from "."
import messages from '../utils/messages'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  await vk.messagesDelete(message.id, true)
}

const echo: CommandObject = {
  command,
  isAdminCommand: false,
  description: messages.removeDescription
}

export default echo
