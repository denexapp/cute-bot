import variables from '../../variables'
import consts from '../../consts'
import getRandomInt from '../../getRandomInt'

export type VkLinkParams = { [key: string]: string | number }

const generateVkLink = (methodName: string, params?: VkLinkParams): string => {
  const query = new URLSearchParams({
    access_token: variables.accessToken,
    v: consts.vkApiVersion,
    random_id: getRandomInt(0, 999999999999999).toString(10),
    ...(params ? params : {})
  })

  return `https://api.vk.com/method/${methodName}?${query}`
}

export default generateVkLink