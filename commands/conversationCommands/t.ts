import { ConversationCommand, ConversationCommandObject } from '..'
import templateShow from './templateShow'

const command: ConversationCommand = async (message, settings) => await templateShow.command(message, settings)

const t: ConversationCommandObject = {
  command,
  isAdminCommand: false,
  description: 't_description'
}

export default t
