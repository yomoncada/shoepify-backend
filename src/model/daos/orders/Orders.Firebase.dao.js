const FirebaseContainer = require("../../containers/Firebase.container");

class FirebaseOrdersDao extends FirebaseContainer {
    constructor(){
        super('orders');
    }
}

module.exports = FirebaseOrdersDao;