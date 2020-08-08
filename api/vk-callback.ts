import { NowRequest, NowResponse } from '@now/node'
import { callbackModes, modes } from '../commands'
import createSettingsCollections from '../utils/database/createSettingsCollections'
import getChatSettings from '../utils/database/getChatSettings'
import decodeVkCallback from '../utils/decodeVkCallback'
import getCallbackServerSettings from '../utils/getCallbackServerSettings'
import handleCommand from '../utils/handleCommand'
import phrase from '../utils/localization/phrase'
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

    await createSettingsCollections()

    const settings = await getChatSettings(peerId)
    const callbackServerSettings = await getCallbackServerSettings(settings)

    if (text.startsWith('/')) {
      await handleCommand(message, settings, callbackServerSettings)
    }

    for (const [commandName, mode] of Object.entries(settings.callbackModes)) {
      if (mode === true) {
        if (callbackServerSettings === null) {
          await vk.messagesSend(peerId, phrase('common_modeCantBeAppliedWithoutCallbackServer', { commandName }))
          continue
        }
        await callbackModes[commandName].action(message, callbackServerSettings)
      }
    }

    for (const [commandName, mode] of Object.entries(settings.modes)) {
      if (mode === true) {
        await modes[commandName].action(message)
      }
    }

    res.send('ok')
    return
  }

  res.send('ok')
}