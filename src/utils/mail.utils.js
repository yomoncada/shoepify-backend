require('dotenv').config()
const nodemailer = require('nodemailer');
const nodemailerConfig = require('../config/nodemailer.config.js');

const transporter = nodemailer.createTransport(nodemailerConfig);
const defaulOptions = {
    from: 'Shoepify',
    to: process.env.ADMIN_EMAIL || 'yomoncadabooking@gmail.com'
};

const send = async (template, data) => {
    try {
        let options = defaulOptions;
        let html = null;

        switch (template) {
            case 'user':
                html = `<p>Hola, admin. Se acaba de registrar un nuevo usuario en el Ecommerce. Sus datos son los siguientes:</p>`;

                html += '<ul>';

                if (data.user?.name) {
                    html += `<li>Nombre: ${data.user.name}</li>`;
                }

                if (data.user?.email) {
                    html += `<li>Email: ${data.user.email}</li>`;
                }

                if (data.user?.phoneNumber) {
                    html += `<li>Teléfono: ${data.user.phoneNumber}</li>`;
                }

                if (data.user?.age) {
                    html += `<li>Edad: ${data.user.age}</li>`;
                }

                if (data.user?.address) {
                    html += `<li>Dirección: ${data.user.address}</li>`;
                }

                html += '</ul>';

                options.subject = 'Nuevo registro';
                options.html = html;
                break;
            case 'order':
                html = `<p>Hola, admin. Se acaba de realizar un pedido en el Ecommerce. Sus datos son los siguientes:</p>`;

                html += '<p>Cliente:</p>';

                html += '<ul>';

                if (data.user?.name) {
                    html += `<li>Nombre: ${data.user.name}</li>`;
                }

                if (data.user?.email) {
                    html += `<li>Email: ${data.user.email}</li>`;
                }

                if (data.user?.phoneNumber) {
                    html += `<li>Teléfono: ${data.user.phoneNumber}</li>`;
                }

                if (data.user?.age) {
                    html += `<li>Edad: ${data.user.age}</li>`;
                }

                if (data.user?.address) {
                    html += `<li>Dirección: ${data.user.address}</li>`;
                }

                html += '</ul>';

                html += '<p>Pedido:</p>';

                html += '<table>';
                    html += '<thead>';
                        html += '<tr>';
                            html += '<th>#</th>';
                            html += '<th>Código</th>';
                            html += '<th>Nombre</th>';
                            html += '<th>Descripción</th>';
                            html += '<th>Precio</th>';
                            html += '<th>Cantidad</th>';
                            html += '<th>Subtotal</th>';
                        html += '</tr>';
                    html += '<thead>';
                    html += '<tbody>';
                    
                    data.cart.products.forEach((cartProduct, index, cartProducts) => {
                        html += '<tr>';
                            html += `<td>${index + 1}</td>`;
                            html += `<td>${cartProduct.product.code}</td>`;
                            html += `<td>${cartProduct.product.name}</td>`;
                            html += `<td>${cartProduct.product.description}</td>`;
                            html += `<td>$${cartProduct.product.price}</td>`;
                            html += `<td>${cartProduct.quantity}</td>`;
                            html += `<td>$${cartProduct.product.price * cartProduct.quantity}</td>`;
                        html += '</tr>';
                    });

                    html += '</tbody>';
                    html += '<tfoot>';
                        html += '<tr>';
                            html += '<th colspan="6" align="right">Total</th>';
                            html += `<td>${data.cart.total}</th>`;
                        html += '</tr>';
                    html += '</tfoot>';
                html += '</table>';

                options.subject = data.user?.name ? `Nuevo pedido de ${data.user.name}` : 'Nuevo pedido';
                options.html = html;
                break;
        }

        return await transporter.sendMail(options)
    } catch(error) {
        throw new Error(error.message);
    }
}

module.exports = {
    send
}