import { CallbackMode, CallbackModeObject } from '..'
import remove from '../../utils/callbackServer/remove'

const action: CallbackMode = async (message, botReacted, { callbackSecret, callbackServerChatId, callbackServerUrl }) => {
  const { conversation_message_id } = message

  await remove(callbackServerUrl, callbackSecret, callbackServerChatId, conversation_message_id)
}

const stop: CallbackModeObject = {
  description: 'stop_description',
  enabledText: 'stop_enabledText',
  disabledText: 'stop_disabledText',
  actionNeedsBotAdminRights: false,
  action
}

export default stop
