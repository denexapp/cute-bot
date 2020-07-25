import { Command, CommandObject } from "."
import setChatSettings from '../utils/database/setChatSetting'
import messagesSend from '../utils/vkApi/messagesSend'
import messages from '../utils/messages'

const command: Command = async (message, settings) => {
  const { peer_id: peerId } = message
  
  const echo = !settings.echo

  await setChatSettings(peerId, { echo })

  await messagesSend(peerId, echo ? messages.echoEnabled : messages.echoDisabled)
}

const echo: CommandObject = {
  command,
  isAdminCommand: true,
  description: messages.echoDescription
}

export default echo
