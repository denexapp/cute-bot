import { ChatSettings } from '../utils/database/getChatSettings'
import { Message } from '../utils/vkCallbackDecoders/messageNewDecoder'
import callbackAdd from './callbackAdd'
import callbackDisconnect from './callbackDisconnect'
import callbackConnect from './callbackConnect'
import callbackRemove from './callbackRemove'
import callbackSecret from './callbackSecret'
import echo from './echo'
import help from './help'
import remove from './remove'

export type Command = (message: Message, settings: ChatSettings) => Promise<void>

export interface CommandObject {
  command: Command
  isAdminCommand: boolean
  worksInGroupChats: boolean
  worksInPrivateMessages: boolean
  description: string
}

export const commands: { [commandName: string]: CommandObject } = {
  callbackAdd,
  callbackConnect,
  callbackDisconnect,
  callbackRemove,
  callbackSecret,
  echo,
  help,
  remove
}