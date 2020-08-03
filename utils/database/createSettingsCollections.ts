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
}

export default createSettingsCollections
