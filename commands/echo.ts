import { Command } from '../utils/handleCommand'
import setChatSettings from '../utils/database/setChatSetting'
import messagesSend from '../utils/vkApi/messagesSend'
import messages from '../utils/messages'

const echo: Command = async (peerId, settings) => {
  const echo = !settings.echo

  await setChatSettings(peerId, { echo })

  await messagesSend(peerId, echo ? messages.echoEnabled : messages.echoDisabled)
}

export default echo
