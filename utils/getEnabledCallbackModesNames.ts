import { ChatSettings } from './database/getChatSettings'

const getEnabledCallbackModesNames = (settings: ChatSettings) => {
  const enabledCallbackModesNames = Object
    .entries(settings.callbackModes)
    .filter(([, mode]) => mode === true)
    .map(([name]) => name)

  return enabledCallbackModesNames
}

export default getEnabledCallbackModesNames