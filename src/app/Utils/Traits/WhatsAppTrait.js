require('dotenv').config()
const twilio = require('twilio');
const twilioConfig = require('../../../config/twilio');

const twilioClient = twilio(twilioConfig.accountSID, twilioConfig.authToken);

const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER || '+541124992375';

const defaulOptions = {
    from: `whatsapp:${twilioConfig.whatsappNumber}`,
    to: `whatsapp:${adminPhoneNumber}`
};

class WhatsAppTrait {
    static async send(template, data) {
        try {
            let options = defaulOptions;
            let body = '';

            switch (template) {
                case 'user':
                    body = `Nuevo registro`;
                    break;
                case 'order':
                    body = data.user?.name ? `Nuevo pedido de ${data.user.name}` : 'Nuevo pedido';
                    break;
            }

            options.body = body;

            return await twilioClient.messages.create(options);
        } catch(error) {
            return [];
            throw new Error(error.message);
        }
    }
}

module.exports = WhatsAppTrait