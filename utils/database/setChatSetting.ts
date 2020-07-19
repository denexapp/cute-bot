import { query as q } from 'faunadb'
import getDatabaseClient from './utils/getDatabaseClient'
import { ChatSettings } from './getChatSettings'

const setChatSettings = async (peerId: number, newSettings: Partial<ChatSettings>) => {
  const client = getDatabaseClient()

  await client.query(
    q.Update(
      q.Ref(
        q.Collection('chats-settings'),
        peerId
      ),
      {
        data: newSettings
      },
    )
  )
}

export default setChatSettings
