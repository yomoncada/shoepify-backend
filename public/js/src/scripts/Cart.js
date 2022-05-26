const addProductToCart = (cartId, productId, quantity) => {
    return new Promise(
        function(resolve, reject) {
            axios({
                method: "post",
                url: `/carts/${cartId}/products`,
                data: {
                    productId: productId,
                    quantity: quantity
                }
            })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
        }
    );
}

const deleteProductFromCart = (cartId, productId) => {
    return new Promise(
        function(resolve, reject) {
            axios({
                method: "delete",
                url: `/carts/${cartId}/products/${productId}`
            })
            .then(async function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
        }
    );
}

const updateCartProducts = (cartId, cartProducts) => {
    return new Promise(
        function(resolve, reject) {
            axios({
                method: "patch",
                url: `/carts/${cartId}/products`,
                data: {
                    cartProducts: cartProducts
                }
            })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
        }
    );
}

const getProductRowLayout = (productId) => {
    return new Promise(
        function(resolve, reject) {
            axios({
                method: "get",
                url: `/layouts/product/${productId}/row`
            })
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
        }
    );
}

class Cart {
    constructor (instance) {
        this.instance = instance;
        this.elements = {
            table: '',
            list: '',
            form: ''
        }
    }

    async addProduct(cartId, productId, quantity) {
        try {
            const response = await addProductToCart(cartId, productId, quantity);
            
            if (response.success) {
                $(location).attr({href: '/cart'});
            } else {
                Swal.fire({
                    title: 'Ups', 
                    text: response.error,
                    icon: 'error'
                });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(inputsSelector) {
        try {
            const inputs = $(inputsSelector);
            let cartId = 0;
            let cartProducts = [];
            let products = [];

            $(inputs).each(function() {
                const input = $(this);
                cartId = input.data('cartId');
                const productId = input.data('productId');
                const price = input.data('productPrice');
                const quantity = input.val();
                const index = input.data('index');

                cartProducts.push({
                    product: {
                        id: productId,
                    },
                    quantity: quantity
                });

                products[index] = {
                    price: price * quantity
                }
            });

            const response = await updateCartProducts(cartId, cartProducts);

            if (response.success) {
                let total = 0;

                products.forEach((product, index, products) => {
                    const row = $(`[data-product-row-index="${index}"]`);
                    const priceText = row.find('.price');

                    priceText.text(product.price);
                    total += product.price;
                });

                const cartTotal = $('.cartTotal');
                cartTotal.text(`$${total}`);
            } else {
                Swal.fire({
                    title: 'Ups', 
                    text: response.message,
                    icon: 'error'
                });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProduct(cartId, productId, index) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Ya no considerarás este producto en tu compra.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteProductFromCart(cartId, productId);

                    if (response.success) {
                        const row = $(`[data-product-row-index="${index}"]`);
                        row.remove();
                    } else {
                        Swal.fire({
                            title: 'Ups', 
                            text: response.message,
                            icon: 'error'
                        });
                    }
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        })
    }

    empty() {}
}