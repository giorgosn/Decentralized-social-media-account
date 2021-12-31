
const winston = require('winston');
const logConfiguration = {
    'transports': [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/webhook.log' })
    ]
};
const logger = winston.createLogger(logConfiguration);

module.exports = {


    postEvent: async function (req, res) {
        const source = req.params.source || null;
        if(source!=null && source==="snapshot") {
            res.status(200).json({message: 'Successfully recieved event from snaphot'})
        }
        else res.status(404).json({message: 'Unknown soure. This source is not yet supported'})

        logger.info('Hello, Winston! Test');
        logger.info(req);


        // console.log(req.body);

       
    },

    receivedEvent: async function (req, res) {
        const source = req.params.source;
        console.log(`Received the following event from ${source}`);
        res.status(200).json('Received successfully');
        logger.info('Hello, Winston! Tets2');

        // console.log(req.body);
    }

}