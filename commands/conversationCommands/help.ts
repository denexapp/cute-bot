import { ConversationCommand, ConversationCommandObject } from '..'
import privateHelp from '../privateMessageCommands/help'

const command: ConversationCommand = async (message, settings) => await privateHelp.command(message)

const help: ConversationCommandObject = {
  command,
  isAdminCommand: false,
  description: 'help_description'
}

export default help
