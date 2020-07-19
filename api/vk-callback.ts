import { NowRequest, NowResponse } from '@now/node'
import decodeVkCallback from '../utils/decodeVkCallback'
import messagesSend from '../utils/vkApi/messagesSend'
import variables from '../utils/variables'
import getChatSettings from '../utils/database/getSettings'

export default async (req: NowRequest, res: NowResponse) => {
  const data = decodeVkCallback(req.body)

  if (data.type === 'confirmation') {
    res.send(variables.confirmationKey)
    return
  }

  if (data.type === 'message_new') {
    const { text, peer_id } = data.object.message
    
    const settings = await getChatSettings(peer_id)

    if (settings.echo) {
      await messagesSend(peer_id, text)
    }
    
    res.send('ok')
    return
  }
  
  res.send('ok')
}

