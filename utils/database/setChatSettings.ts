import { query as q } from 'faunadb'
import { DeepPartial } from '../typescript/deepPartial'
import { ChatSettings } from './getChatSettings'
import getDatabaseClient from './utils/getDatabaseClient'

const setChatSettings = async (peerId: number, newSettings: DeepPartial<ChatSettings>) => {
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
