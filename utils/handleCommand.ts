import { ChatSettings } from './database/getChatSettings'
import { CallbackServerSettings } from './getCallbackServerSettings'
import handleConversationMessage from './handleConversationMessage'
import handlePrivateMessage from './handlePrivateMessage'
import { Message } from './vkCallbackDecoders/messageNewDecoder'

const getFirstWord = (text: string) => {
  const spaceIndex = text.indexOf(' ')
  return spaceIndex === -1 ? text : text.slice(0, spaceIndex)
}

const handleCommand = async (message: Message, settings: ChatSettings, callbackServerSettings: CallbackServerSettings | null) => {
  const { text } = message
  const commandName = getFirstWord(text).slice(1)
  const privateMessage = message.peer_id < 2000000000

  if (privateMessage) {
    await handlePrivateMessage(message, commandName)
  } else {
    await handleConversationMessage(message, commandName, settings, callbackServerSettings)
  }
}

export default handleCommand