import { ConversationCommand, ConversationCommandObject } from '..'
import editChatTemplateMessage from '../../utils/database/editChatTemplateMessage'
import phrase from '../../utils/localization/phrase'
import vk from '../../utils/vk'

const command: ConversationCommand = async (message, settings) => {
  const { peer_id: peerId, text } = message

  const [commandName, templateName] = text.split(' ')

  if (templateName === undefined || templateName.length === 0) {
    await vk.messagesSend(peerId, phrase('templateEdit_failNoNameOrText'))
    return
  }

  const templateText = text.slice(commandName.length + templateName.length + 2).trim()

  if (templateText.length === 0) {
    await vk.messagesSend(peerId, phrase('templateEdit_failNoNameOrText'))
    return
  }

  const resultStatus = await editChatTemplateMessage(peerId, templateName, templateText)

  if (resultStatus === -1) {
    await vk.messagesSend(peerId, phrase('templateEdit_failNoTemplates'))
    return
  }

  if (resultStatus === -2) {
    await vk.messagesSend(peerId, phrase('templateEdit_failNoTemplateWithThisName', {
      templateName
    }))
    return
  }

  if (resultStatus === 0) {
    await vk.messagesSend(peerId, phrase('templateEdit_success', {
      templateName
    }))
    return
  }
}

const templateEdit: ConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: 'templateAdd_description'
}

export default templateEdit
