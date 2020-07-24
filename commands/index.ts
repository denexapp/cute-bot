import { ChatSettings } from '../utils/database/getChatSettings'
import echo from './echo'
import help from './help'

export type Command = (peerId: number, settings: ChatSettings) => Promise<void>

export type CommandObject = {
  command: Command
  isAdminCommand: boolean
  description: string
}

export const commands: { [commandName: string]: CommandObject}  = {
  echo,
  help
}