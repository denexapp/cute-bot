import { NowRequest, NowResponse } from '@now/node'
import decodeVkCallback from '../utils/decodeVkCallback'
import messagesSend from '../utils/vkApi/messagesSend'

export default async (req: NowRequest, res: NowResponse) => {
  const data = decodeVkCallback(req.body)

  if (data.type === 'confirmation') {
    // do nothing
  }

  if (data.type === 'message_new') {
    const { text, peer_id } = data.object

    await messagesSend(peer_id, text)
  }
  
  res.send('ok')
}

