import { NowRequest, NowResponse } from '@now/node'
import createChatSettingsCollection from '../utils/database/createChatsSettingsCollection'
import getChatSettings from '../utils/database/getChatSettings'
import decodeVkCallback from '../utils/decodeVkCallback'
import handleCommand from '../utils/handleCommand'
import variables from '../utils/variables'
import messagesSend from '../utils/vkApi/messagesSend'

export default async (req: NowRequest, res: NowResponse) => {
  const data = decodeVkCallback(req.body)

  if (data.type === 'confirmation') {
    res.send(variables.confirmationKey)
    return
  }

  if (data.type === 'message_new') {
    const { text, peer_id, from_id } = data.object.message
    
    await createChatSettingsCollection()
    const settings = await getChatSettings(peer_id)

    if (text.startsWith('/')) {
      await handleCommand(text, peer_id, from_id, settings)
    } else if (settings.echo) {
      await messagesSend(peer_id, text)
    }
    
    res.send('ok')
    return
  }
  
  res.send('ok')
}