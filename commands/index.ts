import { ChatSettings } from '../utils/database/getChatSettings'
import { Message } from '../utils/vkCallbackDecoders/messageNewDecoder'
import echo from './echo'
import help from './help'
import remove from './remove'

export type Command = (message: Message, settings: ChatSettings) => Promise<void>

export type CommandObject = {
  command: Command
  isAdminCommand: boolean
  description: string
}

export const commands: { [commandName: string]: CommandObject}  = {
  echo,
  help,
  remove
}