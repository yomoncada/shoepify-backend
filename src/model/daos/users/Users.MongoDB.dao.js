const MongoDBContainer = require("../../../model/containers/MongoDB.container");
const UserSchema = require('../../../model/schemas/User.schema');
const { formatErrorObject } = require('../../../utils/api.utils');
const constants = require('../../../constants/api.constants');

const { 
  STATUS: { 
    INTERNAL_ERROR,
    NOT_FOUND
  }
} = constants;

class MongoDBUsersDao extends MongoDBContainer {
    constructor(){
        super('users', UserSchema);
    }

    async getByEmail(email) {
      try {
        const user = await this.model.findOne({ email }, { __v: 0 });
        
        if (!user) {
          const errorMessage = `Wrong username or password`;
          const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
          throw new Error(JSON.stringify(newError));
        } else {
          return user;
        }
      }
      catch(error) {
        const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
        throw new Error(JSON.stringify(newError));
      }
    }
}

module.exports = MongoDBUsersDao;