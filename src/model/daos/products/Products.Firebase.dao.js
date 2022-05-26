const FirebaseContainer = require("../../containers/Firebase.container");

class FirebaseProductsDao extends FirebaseContainer {
    constructor(){
        super('products');
    }
}

module.exports = FirebaseProductsDao;