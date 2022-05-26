const getProducts = (id = null) => {
    return new Promise(
        function(resolve, reject) {
            axios({
                method: "get",
                url: !id ? `/products/` : `/products/${id}`
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

const getProductCardLayout = (id) => {
    return new Promise(
        function(resolve, reject) {
            axios({
                method: "get",
                url: `/layouts/product/${id}/card`
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

class Product {
    constructor (instance) {
        this.instance = instance;
        this.elements = {
            list: '',
            form: ''
        }
    }

    async list() {
        try {
            const list = $(this.elements.list);
            const response = await getProducts();

            if (response.success) {
                list.empty();

                response.data.forEach(async (product) => {  
                    const layout = await getProductCardLayout(product['_id']);
                    list.append(layout.data);
                });

                localStorage.setItem('products', JSON.stringify(response.data));
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

    async submitForm() {
        try {
            const form = $(this.elements.form);
            const cartId = form.find('[name="cart"]').val();
            const productId = form.find('[name="id"]').val();
            const quantity = form.find('[name="quantity"]').val();

            await cart.addProduct(cartId, productId, quantity);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}