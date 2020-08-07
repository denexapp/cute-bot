import { Command, CommandObject } from '.'
import getUserSettings from '../utils/database/getUserSettings'
import removeUserCallbackServer from '../utils/database/removeUserCallbackServer'
import setUserSettings from '../utils/database/setUserSettings'
import generateSecret from '../utils/generateSecret'
import phrase from '../utils/localization/phrase'
import vk from '../utils/vk'

const command: Command = async (message, settings) => {
  const { peer_id: peerId, from_id: userId } = message

  const { callbackServerUrl } = await getUserSettings(userId)

  const callbackSecret = await generateSecret()

  await setUserSettings(userId, { callbackSecret })

  if (callbackServerUrl === null) {
    await vk.messagesSend(peerId, phrase('callbackSecretReset_keyReset'))
    return
  }

  const chatIds = await removeUserCallbackServer(userId)

  await vk.messagesSend(peerId, phrase('callbackSecretReset_keyResetAndServerRemoved'))

  for (const chatId of chatIds) {
    await vk.messagesSend(chatId, phrase('callbackSecretReset_keyChatMessage'))
  }
}

const callbackRemove: CommandObject = {
  command,
  worksInGroupChats: false,
  worksInPrivateMessages: true,
  isAdminCommand: false,
  requiresCallbackServer: false,
  description: 'callbackSecretReset_description'
}

export default callbackRemove
