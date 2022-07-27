const MongoDBContainer = require("../../Containers/MongoDBContainer");
const UserSchema = require('../../Schemas/UserSchema');

class UserMongoDBDAO extends MongoDBContainer {
    static instance;
    
    constructor() {
        if (!UserMongoDBDAO.instance) {
            super('users', UserSchema);
            UserMongoDBDAO.instance = this;
            return this;
        } else {
            return UserMongoDBDAO.instance;
        }
    }
    
    async getByEmail(email) {
        try {
            return await this.model.findOne({ email }, { __v: 0 }).lean()
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = UserMongoDBDAO;