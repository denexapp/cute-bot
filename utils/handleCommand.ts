import { ChatSettings } from './database/getChatSettings'
import messages from './localization/messages/en'
import { commands } from '../commands'
import { Message } from './vkCallbackDecoders/messageNewDecoder'
import vk from './vk'
import phrase from './localization/phrase'

const getFirstWord = (text: string) => {
  const spaceIndex = text.indexOf(' ')
  return spaceIndex === -1 ? text : text.slice(0, spaceIndex)
}

const handleCommand = async (message: Message, settings: ChatSettings) => {
  const { from_id: fromId, peer_id: peerId, text } = message

  const commandName = getFirstWord(text).slice(1)
  const commandObject = commands[commandName]

  if (commandObject === undefined) {
    await vk.messagesSend(peerId, phrase('common_unknownCommand'))
    return
  }

  const privateMessage = message.peer_id < 2000000000

  if (privateMessage && !commandObject.worksInPrivateMessages) {
    await vk.messagesSend(peerId, phrase('common_unknownCommand'))
    return
  }

  if (!privateMessage && !commandObject.worksInGroupChats) {
    await vk.messagesSend(peerId, phrase('common_commandAvailableInThePrivateChatOnly'))
    return
  }

  if (commandObject.isAdminCommand) {
    const { items } = await vk.messagesGetConversationMembers(peerId)
    const memberIndex = items.findIndex(({ member_id }) => member_id === fromId)

    if (memberIndex === -1) {
      await vk.messagesSend(peerId, phrase('common_commandCalledByLeftUser'))
      return
    }

    if (!items[memberIndex].is_admin) {
      await vk.messagesSend(peerId, phrase('common_commandAvailableForAdminsOnly'))
      return
    }
  }

  if (commandObject.requiresCallbackServer && (settings.callbackServerChatId === null || settings.callbackServerUserId === null)) {
    await vk.messagesSend(peerId, phrase('common_commandRequiresCallbackServer'))
    return
  }

  await commandObject.command(message, settings)
}

export default handleCommand