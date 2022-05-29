const createOrder = (userId, cartId) => {
    return new Promise(
        function(resolve, reject) {
            axios({
                method: "post",
                url: `/orders/`,
                data: {
                    userId,
                    cartId
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

class Checkout {
    constructor (instance) {
        this.instance = instance;
        this.elements = {
            table: '',
            list: '',
            form: ''
        }
    }

    async submitForm() {
        try {
            const form = $(this.elements.form);
            const userId = form.find('[name="user"]').val();
            const cartId = form.find('[name="cart"]').val();

            const response = await createOrder(userId, cartId);

            if (response.success) {
                Swal.fire({
                    title: '¡Compra Exitosa!', 
                    text: 'Gracias por preferirnos.',
                    icon: 'success'
                }).then(function() {
                    $(location).attr({href: '/'});
                });
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
}