const { DB_CONFIG: dbconfig } = require('../../../config');
const mongoose = require('mongoose');

class MongoDBContainer {
    constructor(collection, schema) {
        mongoose.connect(dbconfig.mongodb.uri);

        this.model = mongoose.model(collection, schema)
    }

    async get(id) {
        try {
            let data = await this.model.findById(id).lean();

            if (data) {
                data = {
                    id: data._id,
                    ...data
                };
                
                delete data._id;
            }

            return data;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async getAll(conditions = {}, limit = null) {
        try {
            let documents = [];
            
            if (limit) {
                documents = await this.model.find(conditions).limit(limit).lean();
            } else {
                documents = await this.model.find(conditions).lean();
            }

            return documents;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            return await this.model.updateOne({ '_id' : id }, { $set: { ...data } });
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await this.model.deleteOne({ '_id' : id });
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }
}

module.exports = MongoDBContainer;