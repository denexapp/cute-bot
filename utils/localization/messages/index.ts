import { Locale } from '../locale'
import en from './en'

type Common =
  | 'common_unknownCommand'
  | 'common_commandCalledByLeftUser'
  | 'common_commandAvailableInThePrivateChatOnly'
  | 'common_commandAvailableInAGroupChatOnly'
  | 'common_commandAvailableForAdminsOnly'
  | 'common_commandRequiresCallbackServer'

type Echo =
  | 'echo_description'
  | 'echo_enabled'
  | 'echo_disabled'

type Help =
  | 'help_description'
  | 'help_command'
  | 'help_userCommands'
  | 'help_adminCommands'

type Remove =
  | 'remove_description'

type CallbackSecretGet =
  | 'callbackSecretGet_description'
  | 'callbackSecretGet_message'

type CallbackSecretReset =
  | 'callbackSecretReset_description'
  | 'callbackSecretReset_keyReset'
  | 'callbackSecretReset_keyResetAndServerRemoved'
  | 'callbackSecretReset_keyChatMessage'

type CallbackAdd =
  | 'callbackAdd_description'
  | 'callbackAdd_failError'
  | 'callbackAdd_failAlreadyExist'
  | 'callbackAdd_failBadUrl'
  | 'callbackAdd_failNoUrl'
  | 'callbackAdd_success'

type CallbackRemove =
  | 'callbackRemove_description'
  | 'callbackRemove_notExist'
  | 'callbackRemove_message'
  | 'callbackRemove_chatMessage'

type CallbackConnect =
  | 'callbackConnect_description'
  | 'callbackConnect_callbackServerAlreadyConnected'
  | 'callbackConnect_noCallbackServer'
  | 'callbackConnect_sameServer'
  | 'callbackConnect_tooMuchConversations'
  | 'callbackConnect_success'

type CallbackDisconnect =
  | 'callbackDisconnect_description'
  | 'callbackDisconnect_notConnected'
  | 'callbackDisconnect_success'


type Context<K extends string> = { [Key in K]: string }

export interface Messages {
  callbackAdd: Context<CallbackAdd>
  callbackConnect: Context<CallbackConnect>
  callbackDisconnect: Context<CallbackDisconnect>
  callbackRemove: Context<CallbackRemove>
  callbackSecretGet: Context<CallbackSecretGet>
  callbackSecretReset: Context<CallbackSecretReset>
  common: Context<Common>
  echo: Context<Echo>
  help: Context<Help>
  remove: Context<Remove>
}

export type MessageKey =
  | CallbackAdd
  | CallbackConnect
  | CallbackDisconnect
  | CallbackRemove
  | CallbackSecretGet
  | CallbackSecretReset
  | Common
  | Echo
  | Help
  | Remove

export const prepareMessages = (messages: Messages): Record<MessageKey, string> => ({
  ...messages.callbackAdd,
  ...messages.callbackConnect,
  ...messages.callbackDisconnect,
  ...messages.callbackRemove,
  ...messages.callbackSecretGet,
  ...messages.callbackSecretReset,
  ...messages.common,
  ...messages.echo,
  ...messages.help,
  ...messages.remove,
})

const messages: { [key in Locale]: Messages } = {
  en
}

export default messages