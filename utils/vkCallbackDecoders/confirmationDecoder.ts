import vkCallbackWithoutObjectRequestDecoder, { VkCallbackRequestWithoutObject } from '../vkCallbackWithoutObjectDecoder'
import variables from '../variables'

export type VkCallbackConfirmation = VkCallbackRequestWithoutObject<'confirmation', typeof variables.secret, typeof variables.groupId>

const confirmationDecoder = vkCallbackWithoutObjectRequestDecoder('confirmation', variables.secret, variables.groupId)

export default confirmationDecoder