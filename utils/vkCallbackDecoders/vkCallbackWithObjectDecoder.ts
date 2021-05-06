import { JsonDecoder } from "ts.data.json";

export interface VkCallbackRequestWithObject<
  Type extends string,
  Response,
  Secret extends string,
  GroupId extends number
> {
  type: Type;
  object: Response;
  secret: Secret;
  group_id: GroupId;
}

const vkCallbackWithObjectRequestDecoder = <
  Type extends string,
  Response,
  Secret extends string,
  GroupId extends number
>(
  type: Type,
  decoder: JsonDecoder.Decoder<Response>,
  secret: Secret,
  groupId: GroupId
) =>
  JsonDecoder.object<
    VkCallbackRequestWithObject<Type, Response, Secret, GroupId>
  >(
    {
      type: JsonDecoder.isExactly(type),
      object: decoder,
      secret: JsonDecoder.isExactly(secret),
      group_id: JsonDecoder.isExactly(groupId),
    },
    "VK callback request"
  );

export default vkCallbackWithObjectRequestDecoder;
