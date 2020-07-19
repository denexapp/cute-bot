import { query as q } from 'faunadb'
import getDatabaseClient from './utils/getDatabaseClient'
import decode from '../decode'
import chatSettingsDecoder from './utils/chatSettingsDecoder'

export interface ChatSettings {
  echo: boolean
}

const getChatSettings = async (): Promise<ChatSettings> => {
  const client = getDatabaseClient()
  
  const settings = await client.query(
    q.Do(
      q.If(
        q.Exists(
          q.Collection('chats-settings')
        ),
        null,
        q.CreateCollection({
          name: 'chats-settings'
        })
      ),
      q.If(
        q.Exists(
          q.Ref(
            q.Collection('chats-settings'),
            123
          )
        ),
        q.Get(
          q.Ref(
            q.Collection('chats-settings'),
            123
          )
        ),
        q.Create(
          q.Ref(
            q.Collection('chats-settings'),
            123
          ),
          {
            data: {
              echo: false
            }
          }
        )
      )
    )
  )

  const decodedSettings = decode(settings, chatSettingsDecoder)

  return decodedSettings
}

export default getChatSettings
