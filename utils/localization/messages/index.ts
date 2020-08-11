import { Locale } from '../locale'
import en from './en'

type Common =
  | 'common_commandAvailableForAdminsOnly'
  | 'common_commandAvailableInAGroupChatOnly'
  | 'common_commandAvailableInThePrivateChatOnly'
  | 'common_commandRequiresCallbackServer'
  | 'common_modeAvailableForAdminsOnly'
  | 'common_modeAvailableInAGroupChatOnly'
  | 'common_modeRequiresCallbackServer'
  | 'common_modeEnabled'
  | 'common_modeDisabled'
  | 'common_modesCantBeAppliedWithoutCallbackServer'
  | 'common_modesCantBeAppliedWithoutAdminRights'
  | 'common_needPermissionsToControlModes'
  | 'common_needPermissionsToUseAdminCommands'
  | 'common_unknownCommand'

type Echo =
  | 'echo_description'
  | 'echo_enabledText'
  | 'echo_disabledText'

type Help =
  | 'help_description'
  | 'help_command'
  | 'help_callbackCommand'
  | 'help_header'
  | 'help_modes'
  | 'help_adminCommands'
  | 'help_userCommands'
  | 'help_privateMessageCommands'

type ProfanityFilter =
  | 'profanityFilter_description'
  | 'profanityFilter_enabledText'
  | 'profanityFilter_disabledText'

type Remove =
  | 'remove_description'

type Stop =
  | 'stop_description'
  | 'stop_enabledText'
  | 'stop_disabledText'

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
  | 'callbackDisconnect_successWithModes'


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
  profanityFilter: Context<ProfanityFilter>
  remove: Context<Remove>
  stop: Context<Stop>
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
  | ProfanityFilter
  | Remove
  | Stop

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
  ...messages.profanityFilter,
  ...messages.remove,
  ...messages.stop,
})

const messages: { [key in Locale]: Messages } = {
  en
}

export default messages