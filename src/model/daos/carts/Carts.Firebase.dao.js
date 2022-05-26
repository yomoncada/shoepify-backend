const FirebaseContainer = require("../../containers/Firebase.container");

class FirebaseCartsDao extends FirebaseContainer {
    constructor(){
        super('carts');
    }
}

module.exports = FirebaseCartsDao;