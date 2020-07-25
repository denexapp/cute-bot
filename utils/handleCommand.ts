import { ChatSettings } from './database/getChatSettings'
import messages from './messages'
import messagesSend from './vkApi/messagesSend'
import { commands } from '../commands'
import messagesGetConversationMembers from './vkApi/messagesGetConversationMembers'
import { Message } from './vkCallbackDecoders/messageNewDecoder'

const getFirstWord = (text: string) => {
  const spaceIndex = text.indexOf(' ')
  return spaceIndex === -1 ? text : text.slice(0, spaceIndex)
}

const handleCommand = async (message: Message, settings: ChatSettings) => {
  const { from_id: fromId, peer_id: peerId, text } = message

  const commandName = getFirstWord(text).slice(1)
  const commandObject = commands[commandName]

  if (commandObject === undefined) {
    await messagesSend(peerId, messages.unknownCommand)
    return
  }

  if (commandObject.isAdminCommand) {
    const { items } = await messagesGetConversationMembers(peerId)
    const memberIndex = items.findIndex(({ member_id }) => member_id === fromId)

    if (memberIndex === -1) {
      await messagesSend(peerId, messages.commandCalledByLeftUser)
      return
    }

    if (!items[memberIndex].is_admin) {
      await messagesSend(peerId, messages.commandAvailableForAdminsOnly)
      return
    }
  }

  await commandObject.command(message, settings)
}

export default handleCommand