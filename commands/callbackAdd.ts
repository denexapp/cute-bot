import { Command, CommandObject } from '.'
import add from '../utils/callbackServer/add'
import getUserSettings from '../utils/database/getUserSettings'
import messages from '../utils/messages'
import isUrlValidAndHttps from '../utils/validateString'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId, from_id: userId, text } = message
  
  const url = text.split(' ')[1]

  if (url === undefined || !isUrlValidAndHttps(url)) {
    const response = `${messages.callbackAddFailBadUrl}\n\n${messages.callbackAddFailUrl}: ${url}`
    await vk.messagesSend(peerId, response)
    return
  }

  const { callbackSecret } = await getUserSettings(userId)

  try {
    await add(url, callbackSecret)
  } catch {
    const response = `${messages.callbackAddFailError}\n\n${messages.callbackAddFailUrl}: ${url === undefined ? '' : url}`
    await vk.messagesSend(peerId, response)
    return
  }

  await vk.messagesSend(peerId, messages.callbackAddSuccess)
}

const callbackAdd: CommandObject = {
  command,
  worksInGroupChats: false,
  worksInPrivateMessages: true,
  isAdminCommand: false,
  description: messages.callbackAddDescription
}

export default callbackAdd
