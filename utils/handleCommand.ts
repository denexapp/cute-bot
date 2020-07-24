import { ChatSettings } from './database/getChatSettings'
import messages from './messages'
import messagesSend from './vkApi/messagesSend'
import { commands } from '../commands'

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