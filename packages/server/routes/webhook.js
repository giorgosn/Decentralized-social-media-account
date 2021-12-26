const webhookController = require('../controllers/webhook_controller');

module.exports = function (router) {
    router.get('/webhook/:source/event', webhookController.receivedEvent);
    router.post('/webhook/:source/event', webhookController.postEvent);
};

