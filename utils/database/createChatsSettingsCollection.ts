import { query as q } from 'faunadb'
import getDatabaseClient from './utils/getDatabaseClient'

const createChatsSettingsCollection = async () => {
  const client = getDatabaseClient()

  await client.query(
    q.If(
      q.Exists(
        q.Collection('chats-settings')
      ),
      null,
      q.CreateCollection({
        name: 'chats-settings'
      })
    ))
}

export default createChatsSettingsCollection
