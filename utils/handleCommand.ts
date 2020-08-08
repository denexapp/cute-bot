import { callbackConversationCommands, callbackModes, conversationCommands, modes, privateMessageCommands, upcastToCallbackModeName, upcastToModeName } from '../commands'
import { ChatSettings } from './database/getChatSettings'
import setChatSettings from './database/setChatSettings'
import handlePrivateMessage from './handlePrivateMessage'
import phrase from './localization/phrase'
import vk from './vk'
import { Message } from './vkCallbackDecoders/messageNewDecoder'
import { CallbackServerSettings } from './getCallbackServerSettings'

const isPrivateMessageCommandWithNameExist = (name: string) => (
  Object.keys(privateMessageCommands).some(commandName => commandName = name)
)

const getFirstWord = (text: string) => {
  const spaceIndex = text.indexOf(' ')
  return spaceIndex === -1 ? text : text.slice(0, spaceIndex)
}

const isUserAdmin = async (peerId: number, fromId: number) => {
  const { items } = await vk.messagesGetConversationMembers(peerId)
  const memberIndex = items.findIndex(({ member_id }) => member_id === fromId)
  return memberIndex !== -1 && items[memberIndex].is_admin
}

const handleCommand = async (message: Message, settings: ChatSettings, callbackServerSettings: CallbackServerSettings | null) => {
  const { from_id: fromId, peer_id: peerId, text } = message
  const commandName = getFirstWord(text).slice(1)
  const privateMessage = message.peer_id < 2000000000

  if (privateMessage) {
    await handlePrivateMessage(message, commandName)
    return
  } else {
    if (callbackModes[commandName] !== undefined) {
      const commandObject = callbackModes[commandName]

      if (!await isUserAdmin(peerId, fromId)) {
        await vk.messagesSend(peerId, phrase('common_modeAvailableForAdminsOnly', { commandName }))
        return
      }

      if (callbackServerSettings === null) {
        await vk.messagesSend(peerId, phrase('common_modeRequiresCallbackServer', { commandName }))
        return
      }

      const callbackModeName = upcastToCallbackModeName(commandName)
      
      await setChatSettings(peerId, {
        callbackModes: {
          [callbackModeName]: settings.callbackModes[callbackModeName] === null ? true : null
        }
      })

      if (settings.callbackModes[callbackModeName] === null) {
        await vk.messagesSend(peerId, phrase('common_modeEnabled', { commandName, enabledText: commandObject.enabledText }))
      } else {
        await vk.messagesSend(peerId, phrase('common_modeDisabled', { commandName, disabledText: commandObject.disabledText }))
      }

      return
    }

    if (modes[commandName] !== undefined) {
      const commandObject = modes[commandName]

      if (!await isUserAdmin(peerId, fromId)) {
        await vk.messagesSend(peerId, phrase('common_modeAvailableForAdminsOnly', { commandName }))
        return
      }

      const modeName = upcastToModeName(commandName)

      await setChatSettings(peerId, {
        modes: {
          [modeName]: settings.modes[modeName] === null ? true : null
        }
      })

      if (settings.modes[modeName] === null) {
        await vk.messagesSend(peerId, phrase('common_modeEnabled', { commandName, enabledText: commandObject.enabledText }))
      } else {
        await vk.messagesSend(peerId, phrase('common_modeDisabled', { commandName, disabledText: commandObject.disabledText }))
      }

      return
    }

    if (callbackConversationCommands[commandName] !== undefined) {
      const commandObject = callbackConversationCommands[commandName]

      if (commandObject.isAdminCommand && !await isUserAdmin(peerId, fromId)) {
        await vk.messagesSend(peerId, phrase('common_commandAvailableForAdminsOnly', { commandName }))
        return
      }

      if (callbackServerSettings === null) {
        await vk.messagesSend(peerId, phrase('common_commandRequiresCallbackServer', { commandName }))
        return
      }
      
      await commandObject.command(message, settings, callbackServerSettings)
      return
    } 

    if (conversationCommands[commandName] !== undefined) {
      const commandObject = conversationCommands[commandName]
      
      if (commandObject.isAdminCommand && !await isUserAdmin(peerId, fromId)) {
        await vk.messagesSend(peerId, phrase('common_commandAvailableForAdminsOnly', { commandName }))
        return
      }

      commandObject.command(message, settings)
      return
    }

    if (isPrivateMessageCommandWithNameExist(commandName)) {
      await vk.messagesSend(peerId, phrase('common_commandAvailableInThePrivateChatOnly', { commandName }))
      return
    }

    await vk.messagesSend(peerId, phrase('common_unknownCommand'))
  }
}

export default handleCommand