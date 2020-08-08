import { PrivateMessageCommand, PrivateMessageCommandObject } from '..'
import getUserSettings from '../../utils/database/getUserSettings'
import removeUserCallbackServer from '../../utils/database/removeUserCallbackServer'
import phrase from '../../utils/localization/phrase'
import vk from '../../utils/vk'

const command: PrivateMessageCommand = async message => {
  const { peer_id: peerId, from_id: userId } = message

  const { callbackServerUrl } = await getUserSettings(userId)

  if (callbackServerUrl === null) {
    await vk.messagesSend(peerId, phrase('callbackRemove_notExist'))
    return
  }

  const chatIds = await removeUserCallbackServer(userId)

  await vk.messagesSend(peerId, phrase('callbackRemove_message'))

  for (const chatId of chatIds) {
    await vk.messagesSend(chatId, phrase('callbackRemove_chatMessage'))
  }
}

const callbackRemove: PrivateMessageCommandObject = {
  command,
  description: 'callbackRemove_description'
}

export default callbackRemove
