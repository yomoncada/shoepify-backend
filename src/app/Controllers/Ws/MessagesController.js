const MessagesService = require('../../Services/MessagesService')
const UsersService = require('../../Services/UsersService')
const ChatRoomsService = require('../../Services/ChatRoomsService')
const UserModel = new UsersService
const ChatRoomModel = new ChatRoomsService

class MessagesController {
    constructor(io, socket) {
        this.io = io
        this.socket = socket
        this.service = new MessagesService
        this.onNewMessage = this.onNewMessage.bind(this)
    }

    async onNewMessage(message) {
        try {
            const createdMessage = await this.service.createMessage(message)

            if (!createdMessage.success) {
                this.socket.emit('server error', createdMessage.message)
            }

            let { id: messageId, _id: _messageId, sender, content, chat } = createdMessage.data

            messageId = !messageId ? _messageId : messageId 

            const existingUser = await UserModel.getUserById(sender)

            if (!existingUser) {
                this.socket.emit('server error', existingUser.message)
            }

            let { id: userId, _id: _userId, name: userName, email, avatar, isAdmin } = existingUser.data

            userId = !userId ? _userId : userId

            const existingChatRoom = await ChatRoomModel.getChatRoomById(chat)

            if (!existingChatRoom.success) {
                this.socket.emit('server error', existingChatRoom.message)
            }

            let { id: chatRoomId, _id: _chatRoomId, name: chatName, messages, users, isGroup } = existingChatRoom.data

            chatRoomId = !chatRoomId ? _chatRoomId : chatRoomId

            messages.push(messageId)

            const chatRoom = {
                messages
            }

            const updatedChatRoom = await ChatRoomModel.updateChatRoomById(chatRoomId, chatRoom)

            if (!updatedChatRoom.success) {
                this.socket.emit('server error', updatedChatRoom.message)
            }
            
            const data = {
                id: messageId,
                sender: {
                    id: userId,
                    name: userName,
                    email,
                    avatar,
                    isAdmin
                },
                content,
                chat: {
                    id: chatRoomId,
                    name: chatName,
                    messages,
                    users,
                    isGroup
                }
            }

            this.io.to(`${chat}`).emit('new message', data)
        } catch (error) {
            this.socket.emit('server error', error.message)
        }
    }
}

module.exports = MessagesController