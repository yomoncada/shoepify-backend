const databaseConfig = require('../../../config/database')
const mongoose = require('mongoose')

class MongoDBContainer {
    constructor(collection, schema) {
        mongoose.connect(databaseConfig.mongodb.uri)
        this.model = mongoose.model(collection, schema)
    }

    async get(id) {
        try {
            return await this.model
                .findById(id, { __v: 0 })
                .lean()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAll(conditions = {}) {
        try {
            return await this.model
                .find(conditions, { __v: 0 })
                .lean()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async create(data) {
        try {
            return await this.model.create(data)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(_id, data) {
        try {
            return await this.model.updateOne({ _id }, { $set: { ...data } })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(_id) {
        try {
            return await this.model.deleteOne({ _id })
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = MongoDBContainer