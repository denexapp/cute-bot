import { Command, CommandObject } from '.'
import setChatSettings from '../utils/database/setChatSettings'
import phrase from '../utils/localization/phrase'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId } = message
  
  const echo = !settings.echo

  await setChatSettings(peerId, { echo })

  await vk.messagesSend(peerId, echo ? phrase('echo_enabled') : phrase('echo_disabled'))
}

const echo: CommandObject = {
  command,
  worksInGroupChats: true,
  worksInPrivateMessages: false,
  isAdminCommand: true,
  requiresCallbackServer: false,
  description: 'echo_description'
}

export default echo
