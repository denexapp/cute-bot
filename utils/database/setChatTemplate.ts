import { query as q } from 'faunadb'
import { JsonDecoder } from 'ts.data.json'
import { limitOfTemplatesPerChat } from '../consts'
import decode from '../decode'
import { ChatSettings } from './getChatSettings'
import getDatabaseClient from './utils/getDatabaseClient'

// Function returns number
// If result === 0 then the new template was added to the chat setting
// If result === -1 then a template with the same name already exists
// If result === -2 then there are too much templates in this chat

const setChatTemplate = async (
  peerId: number,
  templateName: string,
  templateMessage: string
): Promise<0 | -1 | -2> => {
  const client = getDatabaseClient()

  const newSettings: Partial<ChatSettings> = {
    templates: {
      [templateName]: {
        message: templateMessage
      }
    }
  }

  const success = await client.query(
    q.Let({
      templates: q.Select(['data', 'templates'], q.Get(
        q.Ref(
          q.Collection('chats-settings'),
          peerId
        )
      ))
    },
      q.If(
        q.Equals(
          q.Select(
            templateName,
            q.Var('templates'),
            -1
          ),
          -1
        ),
        q.If(
          q.GTE(
            q.Count(
              q.ToArray(
                q.Var('templates')
              )
            ),
            limitOfTemplatesPerChat
          ),
          -2,
          q.Do(
            q.Update(
              q.Ref(
                q.Collection('chats-settings'),
                peerId
              ),
              {
                data: newSettings
              }
            ),
            0
          )
        ),
        -1,
      )
    )
  )

  const decodedNumber = decode(success, JsonDecoder.oneOf<0 | -1 | -2>([
    JsonDecoder.isExactly(0),
    JsonDecoder.isExactly(-1),
    JsonDecoder.isExactly(-2)
  ], 'Decoded number'))

  return decodedNumber
}

export default setChatTemplate
