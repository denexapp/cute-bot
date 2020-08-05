import makeRequestToCallback from './utils/makeRequestToCallback'
import { JsonDecoder } from 'ts.data.json'

const remove = async (url: string, secret: string, chatId: number, conversationMessageId: number) => (
  await makeRequestToCallback(url, 'remove', secret, { chatId, conversationMessageId }, JsonDecoder.isNull(null))
)

export default remove