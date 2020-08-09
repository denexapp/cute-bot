import { Messages } from '.'

const en: Messages = {
  callbackAdd: {
    callbackAdd_description: 'adds personal callback server',
    callbackAdd_failError: 'Failed to add callback server. Make sure that server is online.  Provided url: "{url}"',
    callbackAdd_failAlreadyExist: 'You alredy have connected callback server. To use new server instead, remove connected server first using /callbackRemove command. Url of current server: {callbackServerUrl}',
    callbackAdd_failNoUrl: 'Failed to add callback server, missing callback server url. This command accepts callback server url as a parameter',
    callbackAdd_failBadUrl: 'Failed to add callback server. Provided url is not acceptable. Provided url: "{url}"',
    callbackAdd_success: 'Callback server successfully added. Now you can connect it to conversations using /callbackConnect command',
  },
  callbackConnect: {
    callbackConnect_description: 'connects your callback server to this conversation',
    callbackConnect_callbackServerAlreadyConnected: 'Another callback server is already connected to this conversation. If you want to replace it, disconnect current callback server by using /callbackDisconnect command',
    callbackConnect_noCallbackServer: 'You don\'t have a connected callback server. In order to connect this conversation to callback server, connect it to your account first by using /callbackAdd command',
    callbackConnect_sameServer: 'Your callback server is already connected to this conversation',
    callbackConnect_tooMuchConversations: 'Can\'t connect your callback server to this conversation. Your callback server is connected to too many conversation. Consider disconnecting it from these conversations using /callbackDisconnect command or ask an another admin to connect its callback server instead\nAmount of conversations your callback server connected to: {amount}\nLimit of conversations per callback server: {limit}',
    callbackConnect_success: 'Your callback server has been connected to this conversation',
  },
  callbackDisconnect: {
    callbackDisconnect_description: 'disconnects your callback server from this conversation',
    callbackDisconnect_successWithModes: `Callback server has been disconnected from this conversation{modesCount, plural,
      =0 {}
      one {. Mode {modesNames} was disabled, because it requires a callback server}
      other {. Modes {modesNames} were disabled, because they require a callback server}
    }`,
  },
  callbackRemove: {
    callbackRemove_description: 'removes personal callback server',
    callbackRemove_notExist: 'You don\'t have a connected callback server to remove',
    callbackRemove_message: 'Your callback server has been disconnected. Don\'t forget to turn off your callback server, if necessary',
    callbackRemove_chatMessage: 'Owner of the callback server has removed it. This conversation doesn\'t have callback server now',
  },
  callbackSecretGet: {
    callbackSecretGet_description: 'shows your callback secret',
    callbackSecretGet_message: 'Your callback secret: {secret}\nDo not share this secret to anyone',
  },
  callbackSecretReset: {
    callbackSecretReset_description: 'resets callback secret and removes personal callback server',
    callbackSecretReset_keyReset: 'Your callback secret has been reset. You can view new secret using /callbackSecretGet command',
    callbackSecretReset_keyResetAndServerRemoved: 'Your callback secret has been reset and your callback server has been removed. You can view new secret using /callbackSecretGet command and you can use /callbackAdd command to add your callback server again',
    callbackSecretReset_keyChatMessage: 'Owner of the callback server has reset callback key and the server has been removed. This conversation doesn\'t have callback server now',
  },
  common: {
    common_unknownCommand: 'Unknown command. Use /help to list all commands',
    common_commandAvailableInThePrivateChatOnly: 'Command /{commandName} is available in the private chat with me only',
    common_commandAvailableInAGroupChatOnly: 'Command /{commandName} is available in a group chat only',
    common_commandAvailableForAdminsOnly: 'Command /{commandName} is available for admins only',
    common_commandRequiresCallbackServer: 'Command /{commandName} requires a callback server connected to this conversation. Use /callbackConnect command to connect your callback server to this conversation',
    common_modeAvailableInAGroupChatOnly: 'Mode /{commandName} is available in a group chat only, like all other modes',
    common_modeAvailableForAdminsOnly: 'Mode /{commandName} can be controled by admins only, like all other modes',
    common_modeDisabled: 'Mode /{commandName} disabled. {disabledText}',
    common_modeEnabled: 'Mode /{commandName} enabled. {enabledText}',
    common_modeRequiresCallbackServer: 'Mode /{commandName} requires a callback server connected to this conversation. Use /callbackConnect command to connect your callback server to this conversation',
    common_modesCantBeAppliedWithoutCallbackServer: `{modesCount, plural,
      one {Effects of modes {modesNames}}
      other {The effect of mode {modesNames}}
    } can't be applied, because callback server is disconnected from this conversation. Reconnect your callback server using /callbackConnect command or disable this mode using /{commandName} command`,
  },
  echo: {
    echo_description: 'echoes all new messages in the chat',
    echo_enabledText: 'I\'ll be repeating all messages in the chat',
    echo_disabledText: 'I won\'t be repeating messages in the chat anymore'
  },
  help: {
    help_description: 'lists all commands',
    help_command: '/{name} - {description}',
    help_callbackCommand: '🌐 /{name} - {description}',
    help_header: 'List of all commands. Commands with the globe icon require callback server',
    help_modes: 'Conversation modes:',
    help_adminCommands: 'Admin commands:',
    help_userCommands: 'User commands:',
    help_privateMessageCommands: 'Commands available in private messages with bot:',
  },
  remove: {
    remove_description: 'removes message with this command',
  },
  stop: {
    stop_description: 'deletes all new messages',
    stop_enabledText: 'All new messages in the chat will be removed',
    stop_disabledText: 'New messages won\'t be removed anymore'
  }
}

export default en
