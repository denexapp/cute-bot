import echo from '../commands/echo'
import { ChatSettings } from './database/getChatSettings'
import messagesSend from './vkApi/messagesSend'
import messages from './messages'

export type Command = (peerId: number, settings: ChatSettings) => Promise<void>

const commands: { [commandName: string]: Command } = {
  echo
}

const getFirstWord = (text: string) => {
  const spaceIndex = text.indexOf(' ')
  return spaceIndex === -1 ? text : text.slice(0, spaceIndex)
}

const handleCommand = async (text: string, peerId: number, settings: ChatSettings) => {
  const commandName = getFirstWord(text).slice(1)
  const command = commands[commandName]

  if (command !== undefined) {
    await command(peerId, settings)
  } else {
    await messagesSend(peerId, messages.unknownCommand)
  }
}

export default handleCommand