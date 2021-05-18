const en = {
  callbackAdd_description: "adds personal callback server",
  callbackAdd_failError:
    'I can\'t add callback server. Make sure that server is online.  Provided url: "{url}"',
  callbackAdd_failAlreadyExist:
    "You alredy have connected callback server. To use new server instead, remove connected server first using /callbackRemove command. Url of current server: {callbackServerUrl}",
  callbackAdd_failNoUrl:
    "I can't add callback server, missing callback server url. This command accepts callback server url as a parameter",
  callbackAdd_failBadUrl:
    'I can\'t add callback server. Provided url is not acceptable. Provided url: "{url}"',
  callbackAdd_success:
    "I added the callback server successfully. Now you can connect it to conversations using /callbackConnect command",

  callbackConnect_description:
    "connects your callback server to this conversation",
  callbackConnect_callbackServerAlreadyConnected:
    "Another callback server is already connected to this conversation. If you want to replace it, disconnect current callback server by using /callbackDisconnect command",
  callbackConnect_noCallbackServer:
    "You don't have a connected callback server. In order to connect this conversation to callback server, connect it to your account first by using /callbackAdd command",
  callbackConnect_sameServer:
    "Your callback server is already connected to this conversation",
  callbackConnect_tooMuchConversations:
    "Can't connect your callback server to this conversation. Your callback server is connected to too many conversation. Consider disconnecting it from these conversations using /callbackDisconnect command or ask an another admin to connect its callback server instead\nAmount of conversations your callback server connected to: {amount}\nLimit of conversations per callback server: {limit}",
  callbackConnect_success:
    "Your callback server has been connected to this conversation",

  callbackDisconnect_description:
    "disconnects your callback server from this conversation",
  callbackDisconnect_successWithModes: `Callback server has been disconnected from this conversation{modesCount, plural,
      =0 {}
      one {. Mode {modesNames} was disabled, because it requires a callback server}
      other {. Modes {modesNames} were disabled, because they require a callback server}
    }`,

  callbackRemove_description: "removes personal callback server",
  callbackRemove_notExist:
    "You don't have a connected callback server to remove",
  callbackRemove_message:
    "Your callback server has been disconnected. Don't forget to turn off your callback server, if necessary",
  callbackRemove_chatMessage: `Owner of the callback server has removed it, so this conversation doesn\'t have a callback server now{
      modesCount, plural,
      =0 {}
      one {. Mode {modesNames} was disabled, because it requires a callback server}
      other {. Modes {modesNames} were disabled, because they require a callback server}
    }`,

  callbackSecretGet_description: "shows your callback secret",
  callbackSecretGet_message:
    "Your callback secret: {secret}\nDo not share this secret to anyone",

  callbackSecretReset_description:
    "resets callback secret and removes personal callback server",
  callbackSecretReset_keyReset:
    "Your callback secret has been reset. You can view the new secret using /callbackSecretGet command",
  callbackSecretReset_keyResetAndServerRemoved:
    "Your callback secret has been reset and your callback server has been removed. You can view new secret using /callbackSecretGet command and you can use /callbackAdd command to add your callback server again",
  callbackSecretReset_keyChatMessage: `Owner of the callback server has reset callback key and the server has been removed, so this conversation doesn\'t have a callback server now{
      modesCount, plural,
      =0 {}
      one {. Mode {modesNames} was disabled, because it requires a callback server}
      other {. Modes {modesNames} were disabled, because they require a callback server}
    }`,

  common_unknownCommand: "Unknown command. Use /help to list all commands",
  common_commandAvailableInThePrivateChatOnly:
    "Command /{commandName} is available in a private chat with me only",
  common_commandAvailableInAGroupChatOnly:
    "Command /{commandName} is available in a group chat only",
  common_commandAvailableForAdminsOnly:
    "Command /{commandName} is available for admins only",
  common_commandRequiresCallbackServer:
    "Command /{commandName} requires a callback server connected to this conversation. Use /callbackConnect command to connect your callback server to this conversation",
  common_hello:
    "Hi! I'm Cute bot. I will help you to moderate this chat. Use /help to learn my commands",
  common_modeAvailableInAGroupChatOnly:
    "Mode /{commandName} is available in a group chat only, like all other modes",
  common_modeAvailableForAdminsOnly:
    "Mode /{commandName} can be controled by admins only, like all other modes",
  common_modeDisabled: "Mode /{commandName} disabled. {disabledText}",
  common_modeEnabled: "Mode /{commandName} enabled. {enabledText}",
  common_modeRequiresCallbackServer:
    "Mode /{commandName} requires a callback server connected to this conversation. Use /callbackConnect command to connect your callback server to this conversation",
  common_modesCantBeAppliedWithoutCallbackServer: `{
      modesCount, plural,
      one {The effect of mode {modesNames}}
      other {Effect of modes {modesNames}}
    } can't be applied, because callback server is disconnected from this conversation. Reconnect your callback server using /callbackConnect command or disable {
      modesCount, plural,
      one {this mode}
      other {these modes}
    } using {modesNamesSlash} {
      modesCount, plural,
      one {command}
      other {commands}
    }`,
  common_modesCantBeAppliedWithoutAdminRights: `{
      modesCount, plural,
      one {The effect of mode {modesNames}}
      other {Effect of modes {modesNames}}
    } can't be applied, because {
      modesCount, plural,
      one {it requires}
      other {they require}
    } admin permissions for the bot. Appoint me as administrator or disable {
      modesCount, plural,
      one {this mode}
      other {these modes}
    } using {modesNamesSlash} {
      modesCount, plural,
      one {command}
      other {commands}
    }`,
  common_needPermissionsToControlModes:
    "Mode /{commandName} can be controled by admins only, like all other modes, but I don't have a permission to check user permissions in this conversation. Appoint me as administrator to use modes",
  common_needPermissionsToReactToCommands:
    "I can't react to this command. Chat settings allow me to react to commands from admins only, but I don't have a permission to check user permissions in this conversation. Appoint me as administrator so I can react to commands according to user permissions",
  common_needPermissionsToUseAdminCommands:
    "Command /{commandName} is available for admins only, but I don't have a permission to check user permissions in this conversation. Appoint me as administrator to use admin commands",
  common_botNeedsToBeAdmin:
    "I don't have enough permissions to use /{commandName} command. Appoint me as administrator to use this command",
  common_failCantKickAdmin: "I can't kick an admin",
  common_failIncorrectUserId:
    "Incorrect user id. You can try to mention them directly using @",
  common_failNoUserInConversation:
    "There's no such user in this conversation. They may have left from the chat or there's a typo",
  common_kickWithCallbackServerFailed:
    "I tried to kick {userLink}, but there is a problem with the callback server. Admins, please kick { sex, select, male {him} female {her} unknown {them}} manualy and and ask {callbackOwnerLink} to check { callbackOwnerSex, select, male {his} female {her} unknown {their}} callback server",
  common_kickWithYourCallbackServerFailed:
    "I tried to kick {userLink}, but there is a problem with your callback server. {modLink}, please kick { sex, select, male {him} female {her} unknown {them}} manualy and check your callback server",
  common_kickWithSomeonesCallbackServerFailed:
    "I tried to kick {userLink}, but there is a problem with the callback server. {modLink}, please kick { sex, select, male {him} female {her} unknown {them}} manualy and ask {callbackOwnerLink} to check { callbackOwnerSex, select, male {his} female {her} unknown {their}} callback server",

  echo_description: "echoes all new messages in the chat",
  echo_enabledText: "I'll be repeating all messages in the chat",
  echo_disabledText: "I won't be repeating messages in the chat anymore",

  help_description: "lists all commands",
  help_command: "😺 /{name} - {description}",
  help_callbackCommand: "🌏 /{name} - {description}",
  help_header:
    "List of all commands. Commands with the globe icon require callback server",
  help_modes: "Conversation modes:",
  help_adminCommands: "Admin commands:",
  help_userCommands: "User commands:",
  help_privateMessageCommands: "Commands available in a private chat with me:",

  ignoreUnknownCommands_description:
    "do not send a message that a command is unknown",
  ignoreUnknownCommands_disabledText:
    "I'll send a message if you use a command that I don't know",
  ignoreUnknownCommands_enabledText:
    "I won't react if you use a command that I don't know",

  ignoreUsers_description: "ignore commands from regular users",
  ignoreUsers_disabledText: "I'll react to commands from regular users",
  ignoreUsers_enabledText: "I will ignore commands from regular users",

  kick_description: "kicks user",
  kick_failNoUserId: 'Type id of user to kick after the command name',
  kick_willBeKicked: "Okay, I will kick {userLink}",

  profanityFilter_description: "deletes messages with Russian swear words",
  profanityFilter_enabledText:
    "I will remove all new messages with swear words",
  profanityFilter_disabledText:
    "Okay, I won't remove messages with swear words anymore",
  profanityFilter_success:
    "{userLink}, I warn you for using word \"{word}\". You have {count, plural, =0 {no warnings} one {1 warning out of {maxCount}} other {# warnings out of {maxCount}}}",
  profanityFilter_willBeKickedWithCallback:
    "{userLink}, I warn you for using word \"{word}\". Your amount of warnings has hit the limit of {maxCount}, so you will be kicked",

  remove_description: "removes message with this command",

  removeCommands_description: "deletes messages with commands",
  removeCommands_disabledText: "I won't delete messages with commands anymore",
  removeCommands_enabledText: "I'll delete messages with commands since now",

  stop_description: "deletes all new messages",
  stop_enabledText: "Ill delete any appearing messages in the chat",
  stop_disabledText: "I won't remove new messages anymore",

  t_description: "shorthand for /templateShow",

  templateAdd_description: "adds template message",
  templateAdd_failNoNameOrText:
    "I can't add the template cause the command misses a name or a message. Please, add the name of the template and the message separated by a space",
  templateAdd_failAlreadyExists:
    'I can\'t add this template cause a template with the same name already exists. The existing template is: "{text}"',
  templateAdd_failTooMuchTemplates: `I can't add this template cause there are too much templates in the chat, the limit is {
      limit, plural,
      =0 {0 templates}
      one {one template}
      other {{limit} templates}
    }`,
  templateAdd_success:
    'I\'ve successfully added template "{templateName}". Use /t {templateName} command to show this template',

  templateEdit_description: "edits template message",
  templateEdit_failNoNameOrText:
    "I can't edit the template cause the command misses a name or a message. Please, add the name of the template and the message separated by a space",
  templateEdit_failNoTemplates:
    "There's no saved templates in the chat. Use /templateAdd command to save a template",
  templateEdit_failNoTemplateWithThisName:
    'There\'s no saved templates with the name "{templateName}". Use /templateList command to see all saved templates',
  templateEdit_success:
    'I\'ve successfully edited template "{templateName}". Use /t {templateName} command to show this template',

  templateList_description: "lists all templates",
  templateList_failNoTemplates:
    "There's no saved templates in the chat. Use /templateAdd command to save a template",
  templateList_header: "Saved messages templates:",
  templateList_template: "😾 /t {name}",

  templateRemove_description: "removes template message",
  templateRemove_failNoName:
    "I can't edit the template cause the command misses a name of the template",
  templateRemove_failNoTemplates:
    "There's no saved templates in the chat. Use /templateAdd command to save a template",
  templateRemove_failNoTemplateWithThisName:
    'There\'s no saved templates with the name "{templateName}". Use /templateList command to see all saved templates',
  templateRemove_success:
    'I\'ve successfully removed template "{templateName}"',

  templateShow_description: "shows template message",
  templateShow_failNoName:
    "I can't show the template cause the command misses a name of the template",
  templateShow_failNoTemplates:
    "There's no saved templates in the chat. Use /templateAdd command to save a template",
  templateShow_failNoTemplateWithThisName:
    'There\'s no saved templates with the name "{templateName}". Use /templateList command to see all saved templates',

  unwarn_description: "shorthand for /warningRemove",

  warn_description: "shorthand for /warningAdd",

  warningAdd_description: "warns user",
  warningAdd_failNoUserId: "Type id of user to warn after the command name",
  warningAdd_failCantWarnAdmin: "I can't warn an admin",
  warningAdd_success:
    "{userLink} has been warned. { sex, select, male {He has} female {She has} unknown {They have}} {count, plural, =0 {no warnings} one {1 warning out of {maxCount}} other {# warnings out of {maxCount}}}",
  warningAdd_willBeKickedWithCallback:
    "{userLink} has been warned. { sex, select, male {His} female {Her} unknown {Their}} amount of warnings has hit the limit of {maxCount}, so I will kick { sex, select, male {him} female {her} unknown {them}}",
  warningAdd_kickManually:
    "{userLink} has been warned and { sex, select, male {his} female {her} unknown {their}} amount of warnings has hit the limit of {maxCount}. {modLink}, please kick { sex, select, male {him} female {her} unknown {them}}",

  warningAmount_description: "shows how many warnings do you or user have",
  warningAmount_failCantCheckIfUserIsAnAdmin:
    "Only admins can see warnings of other people but I am not allowed to check if you are an admin or not. Appoint me as administrator or ask {userLink} to use this command",
  warningAmount_failCantCheckIfUnknownUserIsAnAdmin:
    "Only admins can see warnings of other people but I am not allowed to check if you are an admin or not. Appoint me as administrator or ask the user to use this command themself",
  warningAmount_failCantSeeWarningsOfOtherPerson:
    "You can't see warnings of other person unless you are an admin",
  warningAmount_message:
    "{userLink}, you have {count, plural, =0 {no warnings} one {1 warning out of {maxCount}} other {# warnings out of {maxCount}}}",
  warningAmount_messageOtherPerson:
    "{userLink} has {count, plural, =0 {no warnings} one {1 warning out of {maxCount}} other {# warnings out of {maxCount}}}",

  warningLimitSet_description: "sets max amount of warnings per user",
  warningLimitSet_failNoLimit:
    "Specify the limit of warnings after the command name",
  warningLimitSet_failIncorrectLimit:
    "The limit of warnings should be a number",
  warningLimitSet_failTooHighLimit:
    "The limit of warnings should be less or equal than {maxWarningsLimit}",
  warningLimitSet_failTooLowLimit:
    "The limit of warnings should be greater or equal than {minWarningsLimit}",
  warningLimitSet_success:
    "I've set warnings limit to {limit}. Users with amount of warnings exceeding the limit will be kicked if they get another warning",

  warningLimitShow_description: "shows the limit of warnings per user",
  warningLimitShow_message:
    "The limit of warnings per user is {warningsLimit}. User gets kicked if they reach the limit",

  warningRemove_description: "removes warning from user",
  warningRemove_failNoUserId: 'Type id of user to unwarn after the command name',
  warningRemove_faliNoWarnsAlready: "@id{id} ({name}) already has no warnings",
  warningRemove_success:
    "@id{id} ({name}) has been unwarned. { sex, select, male {He has} female {She has} unknown {They have}} {count, plural, =0 {no warnings} one {1 warning out of {maxCount}} other {# warnings out of {maxCount}}}",
};

export default en;
