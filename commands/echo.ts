import { Command, CommandObject } from '.'
import setChatSettings from '../utils/database/setChatSetting'
import messages from '../utils/messages'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId } = message
  
  const echo = !settings.echo

  await setChatSettings(peerId, { echo })

  await vk.messagesSend(peerId, echo ? messages.echoEnabled : messages.echoDisabled)
}

const echo: CommandObject = {
  command,
  isAdminCommand: true,
  description: messages.echoDescription
}

export default echo
