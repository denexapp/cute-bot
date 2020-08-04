const messages = {
  unknownCommand: 'Unknown command. Use /help to list all commands',
  commandCalledByLeftUser: 'User who called this command left the chat',
  commandAvailableInThePrivateChatOnly: 'This command is available only in the private chat with me',
  commandAvailableInAGroupChatOnly: 'This command is available only in a group chat',
  commandAvailableForAdminsOnly: 'This command is available for admins only',
  echoDescription: 'echoes all new messages in the chat',
  echoEnabled: 'Echo enabled',
  echoDisabled: 'Echo disabled',
  helpDescription: 'lists all commands',
  helpUserCommands: 'User commands',
  helpAdminCommands: 'Admin commands',
  removeDescription: 'removes message with this command',
  callbackSecretDescription: 'shows your callback secret',
  callbackSecretMessage: 'Your callback secret',
  callbackSecretMessageAttention: 'Do not share this secret to anyone',
  callbackAddDescription: 'Adds personal callback server',
  callbackAddFailError: 'Failed to add callback server. Make sure that server is online',
  callbackAddFailBadUrl: 'Failed to add callback server. Provided url is not acceptable',
  callbackAddFailUrl: 'Server url',
  callbackAddSuccess: 'Callback server successfully added',
  callbackRemoveDescription: 'Removes personal callback server and resets callback secret',
  callbackRemoveMessage: 'Your callback server has been disconnected. Callback secret has been reset. Don\'t forget to turn off your callback server, if necessary.'
}

export default messages
