import { JsonDecoder } from 'ts.data.json'

export type VkCallbackRequestWithoutObject<Type extends string, Secret extends string, GroupId extends number> = {
  type: Type
  secret: Secret
  groupId: GroupId
}

const vkCallbackWithoutObjectRequestDecoder = <Type extends string, Secret extends string, GroupId extends number>(
  type: Type,
  secret: Secret,
  groupId: GroupId
): JsonDecoder.Decoder<VkCallbackRequestWithoutObject<Type, Secret, GroupId>> => JsonDecoder.object({
  type: JsonDecoder.isExactly(type),
  secret: JsonDecoder.isExactly(secret),
  groupId: JsonDecoder.isExactly(groupId)
}, 'VK callback request')

export default vkCallbackWithoutObjectRequestDecoder