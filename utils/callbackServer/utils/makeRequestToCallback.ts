import decodeCallback from './decodeCallback'
import { JsonDecoder } from 'ts.data.json'

const makeRequestToCallback = async <T>(
  url: string,
  type: string,
  secret: string,
  object: unknown,
  callbackDecoder: JsonDecoder.Decoder<T>
) => {
  const body = {
    type,
    secret,
    object
  }

  const result = await fetch(url, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!result.ok) {
    throw new Error(`Callback server responded with unexpeted code ${result.status}`)
  }

  const json = await result.json()
 
  const { response } = decodeCallback(json, callbackDecoder)

  return response
}

export default makeRequestToCallback