import { query as q } from 'faunadb'
import getDatabaseClient from './utils/getDatabaseClient'

const createSettingsCollections = async () => {
  const client = getDatabaseClient()

  await client.query(
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
          q.Collection('users-settings')
        ),
        null,
        q.CreateCollection({
          name: 'users-settings'
        })
      )
    )
  )

  await client.query(
    q.Do(
      q.If(
        q.Exists(
          q.Index('chats-by-callback-server-user-id')
        ),
        null,
        q.CreateIndex({
          name: 'chats-by-callback-server-user-id',
          source: q.Collection('chats-settings'),
          terms: [{ field: ['data', 'callbackServerUserId'] }]
        })
      )
    )
  )
}

export default createSettingsCollections
