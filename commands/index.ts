import { ChatSettings } from '../utils/database/getChatSettings'
import { MessageKey } from '../utils/localization/messages'
import { Message } from '../utils/vkCallbackDecoders/messageNewDecoder'
import callbackDisconnect from './callbackConversationCommands/callbackDisconnect'
import callbackConnect from './conversationCommands/callbackConnect'
import help from './conversationCommands/help'
import echo from './modes/echo'
import callbackAdd from './privateMessageCommands/callbackAdd'
import callbackRemove from './privateMessageCommands/callbackRemove'
import callbackSecretGet from './privateMessageCommands/callbackSecretGet'
import callbackSecretReset from './privateMessageCommands/callbackSecretReset'
import privateHelp from './privateMessageCommands/help'
import remove from './callbackConversationCommands/remove'
import stop from './callbackModes/stop'
import { JsonDecoder } from 'ts.data.json'
import decode from '../utils/decode'
import { CallbackServerSettings } from '../utils/getCallbackServerSettings'

export type Mode = (
  message: Message
) => Promise<void>

export type CallbackMode = (
  message: Message,
  callbackServerSettings: CallbackServerSettings
) => Promise<void>

export type ConversationCommand = (
  message: Message,
  settings: ChatSettings
) => Promise<void>

export type CallbackConversationCommand = (
  message: Message,
  settings: ChatSettings,
  callbackServerSettings: CallbackServerSettings
) => Promise<void>

export type PrivateMessageCommand = (
  message: Message
) => Promise<void>

export interface ModeObject {
  description: MessageKey
  enabledText: MessageKey
  disabledText: MessageKey
  actionNeedsBotAdminRights: boolean
  action: Mode
}

export interface CallbackModeObject {
  description: MessageKey
  enabledText: MessageKey
  disabledText: MessageKey
  actionNeedsBotAdminRights: boolean
  action: CallbackMode
}

export interface ConversationCommandObject {
  command: ConversationCommand
  isAdminCommand: boolean
  description: MessageKey
}

export interface CallbackConversationCommandObject {
  command: CallbackConversationCommand
  isAdminCommand: boolean
  description: MessageKey
}

export interface PrivateMessageCommandObject {
  command: PrivateMessageCommand
  description: MessageKey
}

export type ModeName = 'echo'

export type CallbackModeName = 'stop'

const internalModes: { [commandName in ModeName]: ModeObject } = {
  echo,
}

const internalCallbackModes: { [commandName in CallbackModeName]: CallbackModeObject } = {
  stop,
}

export const upcastToModeName = (value: string): ModeName => (
  decode<ModeName>(value, JsonDecoder.oneOf<ModeName>([
    JsonDecoder.isExactly('echo')
  ], 'Modes'))
)

export const upcastToCallbackModeName = (value: string): CallbackModeName => (
  decode<CallbackModeName>(value, JsonDecoder.oneOf<CallbackModeName>([
    JsonDecoder.isExactly('stop')
  ], 'Callback modes'))
)

export const modes: { [commandName: string]: ModeObject } = internalModes

export const callbackModes: { [commandName: string]: CallbackModeObject } = internalCallbackModes

export const conversationCommands: { [commandName: string]: ConversationCommandObject } = {
  callbackConnect,
  help,
}

export const callbackConversationCommands: { [commandName: string]: CallbackConversationCommandObject } = {
  callbackDisconnect,
  remove,
}

export const privateMessageCommands: { [commandName: string]: PrivateMessageCommandObject } = {
  callbackAdd,
  callbackSecretGet,
  callbackSecretReset,
  callbackRemove,
  help: privateHelp,
}
