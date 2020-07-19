import echo from '../commands/echo'
import help from '../commands/help'
import { ChatSettings } from './database/getChatSettings'
import messages from './messages'
import messagesSend from './vkApi/messagesSend'

export type Command = (peerId: number, settings: ChatSettings) => Promise<void>

export type CommandObject = {
  command: Command
  description: string
}

export const commands: { [commandName: string]: CommandObject } = {
  echo,
  help
}

const getFirstWord = (text: string) => {
  const spaceIndex = text.indexOf(' ')
  return spaceIndex === -1 ? text : text.slice(0, spaceIndex)
}

const handleCommand = async (text: string, peerId: number, settings: ChatSettings) => {
  const commandName = getFirstWord(text).slice(1)
  const commandObject = commands[commandName]

  if (commandObject !== undefined) {
    await commandObject.command(peerId, settings)
  } else {
    await messagesSend(peerId, messages.unknownCommand)
  }
}

export default handleCommand