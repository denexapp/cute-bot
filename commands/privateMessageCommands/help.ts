import {
  ActionlessModeObject,
  actionlessModes,
  CallbackConversationCommandObject,
  callbackConversationCommands,
  CallbackModeObject,
  callbackModes,
  ConversationCommandObject,
  conversationCommands,
  ModeObject,
  modes,
  PrivateMessageCommand,
  PrivateMessageCommandObject,
  privateMessageCommands
} from '..'
import { MessageKey } from '../../utils/localization/messages'
import phrase from '../../utils/localization/phrase'
import vk from '../../utils/vk'

type CommandItem = [
  string,
  | ActionlessModeObject
  | ModeObject
  | CallbackModeObject
  | ConversationCommandObject
  | CallbackConversationCommandObject
  | PrivateMessageCommandObject
]

const generateCommandList = (
  header: MessageKey,
  commands: Array<CommandItem> = [ ],
  callbackCommands: Array<CommandItem> = [ ]
): string => {
  const mapper = 
    (messageKey: MessageKey) =>
    ([name, { description }]: CommandItem) =>
    phrase(messageKey, { name, description: phrase(description) })

  return [
    phrase(header),
    ...callbackCommands.map(mapper('help_callbackCommand')),
    ...commands.map(mapper('help_command')),
  ].join('\n')
}

const command: PrivateMessageCommand = async message => {
  const { peer_id: peerId } = message

  const adminCommands = Object
    .entries(conversationCommands)
    .filter(([, command]) => command.isAdminCommand)
    
  const adminCallbackCommands = Object
    .entries(callbackConversationCommands)
    .filter(([, command]) => command.isAdminCommand)

  const userCommands = Object
    .entries(conversationCommands)
    .filter(([, command]) => !command.isAdminCommand)
  
  const userCallbackCommands = Object
    .entries(callbackConversationCommands)
    .filter(([, command]) => !command.isAdminCommand)

  const modesText = generateCommandList('help_modes', [...Object.entries(modes), ...Object.entries(actionlessModes)], Object.entries(callbackModes))
  const adminCommandsText = generateCommandList('help_adminCommands', adminCommands, adminCallbackCommands)
  const userCommandsText = generateCommandList('help_userCommands', userCommands, userCallbackCommands)
  const privateMessagesCommandsText = generateCommandList('help_privateMessageCommands', Object.entries(privateMessageCommands))

  const text = [
    phrase('help_header'),
    modesText,
    adminCommandsText,
    userCommandsText,
    privateMessagesCommandsText
  ].join('\n\n')

  await vk.messagesSend(peerId, text)
}

const help: PrivateMessageCommandObject = {
  command,
  description: 'help_description'
}

export default help
