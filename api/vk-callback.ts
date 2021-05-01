import { VercelRequest, VercelResponse } from '@vercel/node'
import createSettingsCollections from '../utils/database/createSettingsCollections'
import decodeVkCallback from '../utils/decodeVkCallback'
import handleMessage from '../utils/handleMessage'
import variables from '../utils/variables'

export default async (req: VercelRequest, res: VercelResponse) => {
  const data = decodeVkCallback(req.body)

  if (data.type === 'confirmation') {
    res.send(variables.confirmationKey)
    return
  }

  if (data.type === 'message_new') {
    const { message } = data.object

    if (message.from_id > 0) {
      await createSettingsCollections()
      await handleMessage(message)
    }

    res.send('ok')
    return
  }

  res.send('ok')
}