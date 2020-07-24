import { Command, CommandObject, commands } from '.'
import messages from '../utils/messages'
import messagesSend from '../utils/vkApi/messagesSend'

type CommandItem = [string, CommandObject]

const generateCommandList = (commands: Array<CommandItem>, header: string): string => {
  const list = commands
    .map(([commandName, { description }]) => `/${commandName} - ${description}`)
    .join('\n')

  const text = `${header}\n${list}`

  return text
}

const command: Command = async (peerId, settings) => {
  const commandItems: Array<CommandItem> = Object.entries(commands)
  const adminCommands = commandItems.filter(([, { isAdminCommand }]) => isAdminCommand)
  const userCommands = commandItems.filter(([, { isAdminCommand }]) => isAdminCommand)

  const userCommandsText = generateCommandList(userCommands, messages.helpUserCommands)
  const adminCommandsText = generateCommandList(adminCommands, messages.helpAdminCommands)

  const message = `${userCommandsText}\n\n${adminCommandsText}`

  await messagesSend(peerId, message)
}

const help: CommandObject = {
  command,
  isAdminCommand: false,
  description: messages.helpDescription
}

export default help
