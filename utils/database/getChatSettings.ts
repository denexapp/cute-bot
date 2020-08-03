import { query as q } from 'faunadb'
import getDatabaseClient from './utils/getDatabaseClient'
import chatSettingsDecoder from './utils/chatSettingsDecoder'
import decodeDatabaseResponse from './utils/decodeDatabaseResponse'

export interface ChatSettings {
  echo: boolean
}

const getDefaultSettings = (): ChatSettings => ({
  echo: false
})

const getChatSettings = async (peerId: number): Promise<ChatSettings> => {
  const client = getDatabaseClient()

  const settings = await client.query(
    q.If(
      q.Exists(
        q.Ref(
          q.Collection('chats-settings'),
          peerId
        )
      ),
      q.Get(
        q.Ref(
          q.Collection('chats-settings'),
          peerId
        )
      ),
      q.Create(
        q.Ref(
          q.Collection('chats-settings'),
          peerId
        ),
        {
          data: getDefaultSettings()
        }
      )
    )
  )

  const decodedSettings = decodeDatabaseResponse(settings, chatSettingsDecoder)

  return decodedSettings
}

export default getChatSettings
