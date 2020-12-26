import { query as q } from 'faunadb'
import { JsonDecoder } from 'ts.data.json'
import decode from '../decode'
import { ChatSettings } from './getChatSettings'
import getDatabaseClient from './utils/getDatabaseClient'

// Function returns number
// If result === 0 then the template was successfully removed
// If result === -1 then there are no saved templates in the chat
// If result === -2 then there\'s no template with this name

const removeChatTemplateMessage = async (
  peerId: number,
  templateName: string
): Promise<0 | -1 | -2> => {
  const client = getDatabaseClient()

  const newSettings: Partial<ChatSettings> = {
    templates: {
      [templateName]: null
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
          q.Count(
            q.ToArray(
              q.Var('templates')
            )
          ),
          0
        ),
        -1,
        q.If(
          q.Equals(
            q.Select(
              templateName,
              q.Var('templates'),
              -1
            ),
            -1
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

export default removeChatTemplateMessage
