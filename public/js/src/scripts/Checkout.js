const createOrder = () => {
    return new Promise(
        function(resolve, reject) {
            axios({
                method: "get",
                url: `/carts/`
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

class Checkout {
    constructor (instance) {
        this.instance = instance;
        this.elements = {
            table: '',
            list: '',
            form: ''
        }
    }

    async createOrder() {

    }

    async submitForm() {
        try {
            const form = $(this.elements.form);
            const userId = form.find('[name="user"]').val();
            const cartId = form.find('[name="cart"]').val();

            console.log(form);
            console.log(userId);
            console.log(cartId);
            /* await this.createOrder(userId, cartId); */
        } catch (error) {
            throw new Error(error.message);
        }
    }
}