import { JsonDecoder } from 'ts.data.json'
import makeVkRequest from './utils/makeVkRequest'

type ConversationMember = {
  member_id: number
  invited_by: number
  join_date: number
  is_admin: boolean
}

type MessagesGetConversationMembersDecoderResponse = {
  count: number
  items: Array<ConversationMember>
  profiles: Array<unknown>
  groups: Array<unknown>
}

const conversationMemberDecoder = JsonDecoder.object<ConversationMember>({
  member_id: JsonDecoder.number,
  invited_by: JsonDecoder.number,
  join_date: JsonDecoder.number,
  conversationMemberDecoder  is_admin: JsonDecoder.oneOf([
    JsonDecoder.boolean,
    JsonDecoder.isUndefined(false)
  ], 'Is admin')
}, 'Conversation member decoder')

const messagesGetConversationMembersDecoder = JsonDecoder.object<MessagesGetConversationMembersDecoderResponse>({
  count: JsonDecoder.number,
  items: JsonDecoder.array(conversationMemberDecoder, 'Items decoder'),
  profiles: JsonDecoder.array(JsonDecoder.succeed, 'Profiles decoder'),
  groups: JsonDecoder.array(JsonDecoder.succeed, 'Groups decoder')
}, 'messages.getConversationMembers decoder')

const messagesGetConversationMembers = async (peerId: number) => (
  await makeVkRequest('messages.getConversationMembers', messagesGetConversationMembersDecoder, {
    peer_id: peerId
  })
)

export default messagesGetConversationMembers