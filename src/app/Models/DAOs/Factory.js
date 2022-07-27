const CartMongoDBDAO = require('../DAOs/Carts/CartMongoDBDAO');
const OrderMongoDBDAO = require('../DAOs/Orders/OrderMongoDBDAO');
const ProductMongoDBDAO = require('../DAOs/Products/ProductMongoDBDAO');
const UserMongoDBDAO = require('../DAOs/Users/UserMongoDBDAO');

class DAOSFactory {
    static getDAOS(type) {
        let CartDAO;
        let OrderDAO;
        let ProductDAO;
        let UserDAO;

        switch(type.toLowerCase()) {
            case 'mongodb':
                CartDAO = new CartMongoDBDAO();
                OrderDAO = new OrderMongoDBDAO();
                ProductDAO = new ProductMongoDBDAO();
                UserDAO = new UserMongoDBDAO();
                break;
            default:
                throw new Error('Persistencia inválida, por favor selecciona una opción correcta (mongodb).')
        }

        return {
            CartDAO,
            OrderDAO,
            ProductDAO,
            UserDAO
        }
    }
}

module.exports = DAOSFactory;