import variables from '../variables'
import consts from '../consts'
import fetch from 'node-fetch'

type Params = { [key: string]: string | number }

const generateVkLink = (methodName: string, params?: Params): string => {
  const query = new URLSearchParams({
    access_token: variables.accessToken,
    v: consts.vkApiVersion,
    ...(params ? params : { })
  })

  return `https://api.vk.com/method/${methodName}?${query}`
}

const messagesSend = async (peerId: number, message: string) => {
  const response = await fetch(generateVkLink('messages.send', {
    message,
    peer_id: peerId
  }))

  if (!response.ok) {
    throw new Error(`Unexpected response status ${response.status}`)
  }
}

export default messagesSend