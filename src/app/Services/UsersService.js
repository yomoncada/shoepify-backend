const UsersRepository = require('../Repositories/UsersRepository')

class UsersService {
    constructor() {
        this.repository = new UsersRepository
    }

    async getUsers() {
        try {
            const users = await this.repository.getAll() 
            return {success: true, message: 'Mensajes obtenidos exitosamente.', data: users}
        } catch (error) {
            return {success: false, message: error.user}
        }
    }

    async getUserById(id) {
        try {
            const existingUser = await this.repository.get(id)

            if (!existingUser) {
                return {success: false, message: 'Mensaje inexistente.'}
            }

            return {success: true, message: 'Mensaje obtenido exitosamente.', data: existingUser}
        } catch (error) {
            return {success: false, message: error.user}
        }
    }

    async getUserByEmail(email) {
        try {
            const existingUser = await this.repository.getByEmail(email)

            if (!existingUser) {
                return {success: false, message: 'Mensaje inexistente.'}
            }

            return {success: true, message: 'Mensaje obtenido exitosamente.', data: existingUser}
        } catch (error) {
            return {success: false, message: error.user}
        }
    }

    async createUser(user) {
        try {
            if (!user.email || !user.password || !user.avatar) {
                return {success: false, message: 'Cuerpo del usuario incompleto.'}
            }

            const userCreation = await this.repository.create(user)

            if (!userCreation._id) {
                return {success: false, message: userCreation}
            }

            return {success: true, message: 'Mensaje creado exitosamente.', data: userCreation}
        } catch (error) {
            return {success: false, message: error.user}
        }
    }

    async updateUserById(id, user) {
        try {
            if (!user.name && !user.sender && !user.content && !user.chat && !user.isAdmin) {
                return {success: false, message: 'Cuerpo del mensaje incompleto.'}
            }

            const userUpdate = await this.repository.update(id, user)

            if (!userUpdate.acknowledged) {
                return {success: false, message: userUpdate}
            }

            return {success: true, message: 'Mensaje actualizado exitosamente.', data: userUpdate}
        } catch (error) {
            return {success: false, message: error.user}
        }
    }

    async deleteUserById(id) {
        try {
            const userDelete = await this.repository.delete(id)

            if (!userDelete.acknowledged) {
                return {success: false, message: userDelete}
            }

            return {success: true, message: 'Mensaje eliminado exitosamente.', data: userDelete}
        } catch (error) {
            return {success: false, message: error.user}
        }
    }
}

module.exports = UsersService