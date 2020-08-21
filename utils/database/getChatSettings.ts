import { query as q } from 'faunadb'
import getDatabaseClient from './utils/getDatabaseClient'
import chatSettingsDecoder from './utils/chatSettingsDecoder'
import decodeDatabaseResponse from './utils/decodeDatabaseResponse'
import { ModeName, CallbackModeName } from '../../commands'

export interface ChatSettings {
  modes: { [key in ModeName]: true | null }
  callbackModes: { [key in CallbackModeName]: true | null }
  callbackServerUserId: null | number
  callbackServerChatId: null | number
  userCommands: boolean
}

const getDefaultSettings = (): ChatSettings => ({
  modes: { echo: null },
  callbackModes: { stop: null, profanityFilter: null },
  callbackServerUserId: null,
  callbackServerChatId: null,
  userCommands: true
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
