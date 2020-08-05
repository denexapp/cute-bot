import { query as q, values } from 'faunadb'
import { Err, JsonDecoder, Ok } from 'ts.data.json'
import { limitOfConversationsForOneCallbackServer } from '../consts'
import decode from '../decode'
import generateSecret from '../generateSecret'
import { ChatSettings } from './getChatSettings'
import { UserSettings } from './getUserSettings'
import getDatabaseClient from './utils/getDatabaseClient'

const refDecoder = new JsonDecoder.Decoder<values.Ref>(ref => {
  if (ref instanceof values.Ref) {
    return new Ok(ref)
  } else {
    return new Err('Not a ref')
  }
})

const refArrayDecoder = JsonDecoder.array<values.Ref>(refDecoder, 'Ref array decoder')

const removeUserCallbackServer = async (userId: number): Promise<Array<number>> => {
  const client = getDatabaseClient()

  const newChatSettings: Partial<ChatSettings> = {
    callbackServerChatId: null,
    callbackServerUserId: null
  }

  const newUserSettings: Partial<UserSettings> = {
    callbackServerUrl: null,
    callbackSecret: await generateSecret()
  }

  const refArray = await client.query(
    q.Do(
      q.Update(
        q.Ref(
          q.Collection('users-settings'),
          userId
        ),
        {
          data: newUserSettings
        }
      ),
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('chats-by-callback-server-user-id'),
            userId
          ),
          { size: limitOfConversationsForOneCallbackServer }
        ),
        q.Lambda(
          'ref',
          q.Do(
            q.Update(
              q.Var('ref'),
              {
                data: newChatSettings
              }
            ),
            q.Var('ref')
          )
        )
      )
    )
  )

  const decoderRefArray = decode(refArray, refArrayDecoder)

  return decoderRefArray.map(ref => parseInt(ref.id, 10))
}

export default removeUserCallbackServer
