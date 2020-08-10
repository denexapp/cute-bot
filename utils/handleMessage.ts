import getChatSettings from './database/getChatSettings'
import getCallbackServerSettings from './getCallbackServerSettings'
import handleConversationMessage from './handleConversationMessage'
import handleModes from './handleModes'
import handlePrivateMessage from './handlePrivateMessage'
import { Message } from './vkCallbackDecoders/messageNewDecoder'

const getCommandName = (text: string) => {
  const spaceIndex = text.indexOf(' ')
  return spaceIndex === -1 ? text.slice(1) : text.slice(1, spaceIndex)
}

const handleMessage = async (message: Message) => {
  const { text, peer_id: peerId } = message
  const privateMessage = message.peer_id < 2000000000
  const command = text.startsWith('/')

  if (!privateMessage) {
    const settings = await getChatSettings(peerId)
    const callbackServerSettings = await getCallbackServerSettings(settings)
    if (command) {
      await handleConversationMessage(message, getCommandName(text), settings, callbackServerSettings)
    }
    await handleModes(message, settings, callbackServerSettings)
  } else {
    if (command) {
      await handlePrivateMessage(message, getCommandName(text))
    }
  }
}

export default handleMessage