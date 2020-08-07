import { ChatSettings } from '../utils/database/getChatSettings'
import { MessageKey } from '../utils/localization/messages'
import { Message } from '../utils/vkCallbackDecoders/messageNewDecoder'
import callbackAdd from './callbackAdd'
import callbackConnect from './callbackConnect'
import callbackDisconnect from './callbackDisconnect'
import callbackRemove from './callbackRemove'
import callbackSecretGet from './callbackSecretGet'
import callbackSecretReset from './callbackSecretReset'
import echo from './echo'
import help from './help'
import remove from './remove'

export type Command = (message: Message, settings: ChatSettings) => Promise<void>

export interface CommandObject {
  command: Command
  isAdminCommand: boolean
  worksInGroupChats: boolean
  worksInPrivateMessages: boolean
  requiresCallbackServer: boolean
  description: MessageKey
}

export const commands: { [commandName: string]: CommandObject } = {
  callbackAdd,
  callbackConnect,
  callbackDisconnect,
  callbackRemove,
  callbackSecretGet,
  callbackSecretReset,
  echo,
  help,
  remove
}