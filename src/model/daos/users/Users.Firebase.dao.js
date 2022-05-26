const FirebaseContainer = require("../../../model/containers/Firebase.container");

class FirebaseUsersDao extends FirebaseContainer {
    constructor(){
        super('user');
    }
}

module.exports = FirebaseUsersDao;