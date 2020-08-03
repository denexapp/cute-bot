import { customAlphabet } from 'nanoid/async'

const nanoid = customAlphabet('1234567890abcdef', 32)

const generateSecret = async () => nanoid()

export default generateSecret