import { NowRequest, NowResponse } from '@now/node'
import createChatSettingsCollection from '../utils/database/createChatsSettingsCollection'
import getChatSettings from '../utils/database/getChatSettings'
import decodeVkCallback from '../utils/decodeVkCallback'
import handleCommand from '../utils/handleCommand'
import variables from '../utils/variables'
import vk from '../utils/vk'

export default async (req: NowRequest, res: NowResponse) => {
  const data = decodeVkCallback(req.body)

  if (data.type === 'confirmation') {
    res.send(variables.confirmationKey)
    return
  }

  if (data.type === 'message_new') {
    const { message } = data.object
    const { text, peer_id: peerId } = message
    
    await createChatSettingsCollection()
    const settings = await getChatSettings(peerId)

    if (text.startsWith('/')) {
      await handleCommand(message, settings)
    } else if (settings.echo) {
      await vk.messagesSend(peerId, text)
    }
    
    res.send('ok')
    return
  }
  
  res.send('ok')
}