import { query as q } from 'faunadb'
import { ActionlessModeName, CallbackModeName, ModeName } from '../../commands'
import chatSettingsDecoder from './utils/chatSettingsDecoder'
import decodeDatabaseResponse from './utils/decodeDatabaseResponse'
import getDatabaseClient from './utils/getDatabaseClient'

export interface ChatSettings {
  actionlessModes: { [key in ActionlessModeName]: true | null }
  modes: { [key in ModeName]: true | null }
  callbackModes: { [key in CallbackModeName]: true | null }
  callbackServerUserId: null | number
  callbackServerChatId: null | number
}

const getDefaultSettings = (): ChatSettings => ({
  actionlessModes: { ignoreUnknownCommands: null, ignoreUsers: null },
  modes: { echo: null },
  callbackModes: { stop: null, profanityFilter: null },
  callbackServerUserId: null,
  callbackServerChatId: null
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
