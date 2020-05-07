import { NowRequest, NowResponse } from '@now/node'
import decodeVkCallback from '../utils/decodeVkCallback'
import messagesSend from '../utils/vkApi/messagesSend'
import variables from '../utils/variables'

export default async (req: NowRequest, res: NowResponse) => {
  console.log(req.body)
  console.log(typeof req.body)
  console.log(JSON.stringify(req.body))
  console.log(variables)
  const data = decodeVkCallback(req.body)

  if (data.type === 'confirmation') {
    res.send(variables.confirmationKey)
    return
  }

  if (data.type === 'message_new') {
    const { text, peer_id } = data.object

    await messagesSend(peer_id, text)
    return
  }
  
  res.send('ok')
}

