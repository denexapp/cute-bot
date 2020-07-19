import { Command, CommandObject, commands } from '../utils/handleCommand'
import messages from '../utils/messages'
import messagesSend from '../utils/vkApi/messagesSend'

const command: Command = async (peerId, settings) => {
  const message = Object
    .entries(commands)
    .map(([commandName, { description }]) => `/${commandName} - ${description}`)
    .join('\n')

  await messagesSend(peerId, message)
}

const help: CommandObject = {
  command,
  description: messages.helpDescription
}

export default help
