import { VkError, VkErrorCode } from 'vk-ts'
import getChatSettings from './database/getChatSettings'
import getCallbackServerSettings from './getCallbackServerSettings'
import handleConversationMessage from './handleConversationMessage'
import handleModes from './handleModes'
import handlePrivateMessage from './handlePrivateMessage'
import vk from './vk'
import { Message } from './vkCallbackDecoders/messageNewDecoder'

const getCommandName = (text: string) => {
  const spaceIndex = text.indexOf(' ')
  return spaceIndex === -1 ? text.slice(1) : text.slice(1, spaceIndex)
}

const isUserAdmin = async (peerId: number, fromId: number): Promise<boolean | null> => {
  try {
    const { items } = await vk.messagesGetConversationMembers(peerId)
    const memberIndex = items.findIndex(({ member_id }) => member_id === fromId)
    return memberIndex !== -1 && items[memberIndex].is_admin
  } catch (error) {
    if (error instanceof VkError && error.code === VkErrorCode.NoAccessToTheConversation) {
      return null
    }
    throw new Error('Unexpected response')
  }
}

const handleMessage = async (message: Message) => {
  const { text, peer_id: peerId, from_id: fromId } = message
  const privateMessage = message.peer_id < 2000000000
  const command = text.startsWith('/')

  if (!privateMessage) {
    const settings = await getChatSettings(peerId)
    const callbackServerSettings = await getCallbackServerSettings(settings)
    const isAdminMessage = await isUserAdmin(peerId, fromId)
    const botHasAdminRights = isUserAdmin !== null
    if (command) {
      await handleConversationMessage(message, getCommandName(text), settings, callbackServerSettings, isAdminMessage)
    }
    await handleModes(message, settings, callbackServerSettings, botHasAdminRights)
  } else {
    if (command) {
      await handlePrivateMessage(message, getCommandName(text))
    }
  }
}

export default handleMessage