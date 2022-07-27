const appConfig = require('../../config/app')

const UserDTO = require('../Models/DTOs/UserDTO')
const DAOSFactory = require('../Models/DAOs/Factory')

class UsersRepository {
    constructor() {
        this.DAO = DAOSFactory.getDAOS(appConfig.env.pers).UserDAO
    }

    async getAll() {
        try {
            const users = await this.DAO.getAll()
            return users.map(user => new UserDTO(user, user._id))
        } catch (error) {
            return []
        }
    }

    async get(id) {
        try {
            const user = await this.DAO.get(id)
            return new UserDTO(user, user._id)
        } catch (error) {
            return null
        }
    }

    async getByEmail(email) {
        try {
            const user = await this.DAO.getByEmail(email)
            return new UserDTO(user, user._id)
        } catch (error) {
            return null
        }
    }

    async getBy(conditions) {
        try {
            const user = await this.DAO.getBy(conditions)
            return new UserDTO(user, user._id)
        } catch (error) {
            return null
        }
    }

    async create(user) {
        try {
            const dto = new UserDTO(user)
            return await this.DAO.create(dto)
        } catch (error) {
            return error.message
        }
    }

    async update(id, user) {
        try {
            const dto = new UserDTO(user)
            return await this.DAO.update(id, dto)
        } catch (error) {
            return error.message
        }
    }

    async delete(id) {
        try {
            return await this.DAO.delete(id)
        } catch (error) {
            return error.message
        }
    }
}

module.exports = UsersRepository