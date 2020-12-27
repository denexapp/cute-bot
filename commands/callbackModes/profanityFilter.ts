import { CallbackMode, CallbackModeObject } from '..'
import remove from '../../utils/callbackServer/remove'
import { flatWords } from 'russian-bad-words'

const action: CallbackMode = async (message, botReacted, { callbackSecret, callbackServerChatId, callbackServerUrl }) => {
  const { conversation_message_id } = message

  const normalizeWord = (word: string) => word.replace('ё', 'е').replace('й', 'и').replace('ъ', 'ь')
  const normalizeWordWithCase = (word: string) => normalizeWord(word).toLocaleLowerCase('ru')

  const swearWordsSet = new Set(flatWords.map(normalizeWord))

  const words = normalizeWordWithCase(message.text).match(/[абвгдежзиклмнопрстуфхцчшщыьэюя]+/g)

  if (words === null) return

  for (const word of words) {
    if (swearWordsSet.has(word)) {
      await remove(callbackServerUrl, callbackSecret, callbackServerChatId, conversation_message_id)
      return
    }
  }
}

const profanityFilter: CallbackModeObject = {
  description: 'profanityFilter_description',
  enabledText: 'profanityFilter_enabledText',
  disabledText: 'profanityFilter_disabledText',
  actionNeedsBotAdminRights: false,
  action
}

export default profanityFilter
