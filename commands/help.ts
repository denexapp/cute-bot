import { Command, CommandObject, commands } from '.'
import phrase from '../utils/localization/phrase'
import vk from '../utils/vk'

type CommandItem = [string, CommandObject]

const generateCommandList = (commands: Array<CommandItem>, header: string): string => {
  const list = commands
    .map(([name, { description }]) => phrase('help_command', { name, description: phrase(description) }))
    .join('\n')

  const text = `${header}\n${list}`

  return text
}

const command: Command = async (message, settings) => {
  const { peer_id: peerId } = message

  const commandItems: Array<CommandItem> = Object.entries(commands)
  const adminCommands = commandItems.filter(([, { isAdminCommand }]) => isAdminCommand)
  const userCommands = commandItems.filter(([, { isAdminCommand }]) => !isAdminCommand)

  const userCommandsText = generateCommandList(userCommands, phrase('help_userCommands'))
  const adminCommandsText = generateCommandList(adminCommands, phrase('help_adminCommands'))

  const text = `${userCommandsText}\n\n${adminCommandsText}`

  await vk.messagesSend(peerId, text)
}

const help: CommandObject = {
  command,
  worksInGroupChats: true,
  worksInPrivateMessages: true,
  isAdminCommand: false,
  requiresCallbackServer: false,
  description: 'help_description'
}

export default help
