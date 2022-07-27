const MessagesRepository = require('../Repositories/MessagesRepository')
class MessagesService {
    constructor() {
        this.repository = new MessagesRepository
    }

    async getMessages() {
        try {
            const messages = await this.repository.getAll() 
            return {success: true, message: 'Mensajes obtenidos exitosamente.', data: messages}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async getMessageById(id) {
        try {
            const existingMessage = await this.repository.get(id)

            if (!existingMessage) {
                return {success: false, message: 'Mensaje inexistente.'}
            }

            return {success: true, message: 'Mensaje obtenido exitosamente.', data: existingMessage}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async createMessage(message) {
        try {
            if (!message.sender || !message.content || !message.chat) {
                return {success: false, message: 'Cuerpo del mensaje incompleto.'}
            }

            const messageCreation = await this.repository.create(message)

            if (!messageCreation._id) {
                return {success: false, message: messageCreation}
            }

            return {success: true, message: 'Mensaje creado exitosamente.', data: messageCreation}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async updateMessageById(id, message) {
        try {
            if (!message.name && !message.sender && !message.content && !message.chat && !message.isAdmin) {
                return {success: false, message: 'Cuerpo del mensaje incompleto.'}
            }

            const messageUpdate = await this.repository.update(id, message)

            if (!messageUpdate.acknowledged) {
                return {success: false, message: messageUpdate}
            }

            return {success: true, message: 'Mensaje actualizado exitosamente.', data: messageUpdate}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async deleteMessageById(id) {
        try {
            const messageDelete = await this.repository.delete(id)

            if (!messageDelete.acknowledged) {
                return {success: false, message: messageDelete}
            }

            return {success: true, message: 'Mensaje eliminado exitosamente.', data: messageDelete}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
}

module.exports = MessagesService