import { ConversationCommand, ConversationCommandObject } from '..'
import { limitOfTemplatesPerChat } from '../../utils/consts'
import setChatTemplate from '../../utils/database/setChatTemplate'
import phrase from '../../utils/localization/phrase'
import vk from '../../utils/vk'

const command: ConversationCommand = async (message, settings) => {
  const { peer_id: peerId, text } = message

  const [commandName, templateName] = text.split(' ')

  if (templateName === undefined || templateName.length === 0) {
    await vk.messagesSend(peerId, phrase('addTemplate_failNoNameOrText'))
    return
  }

  const templateText = text.slice(commandName.length + templateName.length + 2).trim()

  if (templateText.length === 0) {
    await vk.messagesSend(peerId, phrase('addTemplate_failNoNameOrText'))
    return
  }

  const resultStatus = await setChatTemplate(peerId, templateName, templateText)

  if (resultStatus === -1) {
    await vk.messagesSend(peerId, phrase('addTemplate_failAlreadyExists', {
      text: templateName
    }))
    return
  }

  if (resultStatus === -2) {
    await vk.messagesSend(peerId, phrase('addTemplate_failTooMuchTemplates', {
      limit: limitOfTemplatesPerChat
    }))
    return
  }

  if (resultStatus === 0) {
    await vk.messagesSend(peerId, phrase('addTemplate_success', {
      templateName
    }))
    return
  }
}

const addTemplate: ConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: 'addTemplate_description'
}

export default addTemplate
