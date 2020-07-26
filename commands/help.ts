import { Command, CommandObject, commands } from '.'
import messages from '../utils/messages'
import vk from '../utils/vk'

type CommandItem = [string, CommandObject]

const generateCommandList = (commands: Array<CommandItem>, header: string): string => {
  const list = commands
    .map(([commandName, { description }]) => `/${commandName} - ${description}`)
    .join('\n')

  const text = `${header}\n${list}`

  return text
}

const command: Command = async (message, settings) => {
  const { peer_id: peerId } = message

  const commandItems: Array<CommandItem> = Object.entries(commands)
  const adminCommands = commandItems.filter(([, { isAdminCommand }]) => isAdminCommand)
  const userCommands = commandItems.filter(([, { isAdminCommand }]) => !isAdminCommand)

  const userCommandsText = generateCommandList(userCommands, messages.helpUserCommands)
  const adminCommandsText = generateCommandList(adminCommands, messages.helpAdminCommands)

  const text = `${userCommandsText}\n\n${adminCommandsText}`

  await vk.messagesSend(peerId, text)
}

const help: CommandObject = {
  command,
  worksInGroupChats: true,
  worksInPrivateMessages: true,
  isAdminCommand: false,
  description: messages.helpDescription
}

export default help
