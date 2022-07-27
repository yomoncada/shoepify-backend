const ProductDTO = require("../../Models/DTOs/ProductDTO")

class CartTrait {
    static getProducts(cart) {
        return cart.products.map((item) => ({
            product: new ProductDTO(item.product, item.product._id),
            quantity: item.quantity
        }))
    }

    static getTotals(cartProducts) {
        let totalPrice = 0;
        let totalItems = 0;

        cartProducts.forEach((cartProduct) => {
            totalPrice += cartProduct.product.price * cartProduct.quantity;
            totalItems += cartProduct.quantity;
        });

        return {
            totalPrice,
            totalItems
        };
    }
}

module.exports = CartTrait