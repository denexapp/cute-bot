import { NowRequest, NowResponse } from '@now/node'
import createSettingsCollections from '../utils/database/createSettingsCollections'
import getChatSettings from '../utils/database/getChatSettings'
import decodeVkCallback from '../utils/decodeVkCallback'
import getCallbackServerSettings from '../utils/getCallbackServerSettings'
import handleCommand from '../utils/handleCommand'
import handleModes from '../utils/handleModes'
import variables from '../utils/variables'

export default async (req: NowRequest, res: NowResponse) => {
  const data = decodeVkCallback(req.body)

  if (data.type === 'confirmation') {
    res.send(variables.confirmationKey)
    return
  }

  if (data.type === 'message_new') {
    const { message } = data.object
    const { text, peer_id: peerId } = message

    await createSettingsCollections()

    const settings = await getChatSettings(peerId)
    const callbackServerSettings = await getCallbackServerSettings(settings)

    if (text.startsWith('/')) {
      await handleCommand(message, settings, callbackServerSettings)
    }

    await handleModes(message, settings, callbackServerSettings)

    res.send('ok')
    return
  }

  res.send('ok')
}