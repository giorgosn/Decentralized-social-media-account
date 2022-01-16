const oauthSignature = require('oauth-signature');
const uuid = require('uuid');
const request = require('request');
const constants = require('../config/constants');
const logger = require('./logger_utils');

module.exports = {

    postTweet: async function (tweetText) {
        const oauth_timestamp = Math.floor(Date.now() / 1000);
        const oauth_nonce = uuid.v1();
        const endpoint = constants.TWITTER.HOST_ENDPOINT + 'tweets';
        const oauth_signature = await this.generateOauth1Signature(endpoint, oauth_timestamp, oauth_nonce);
        const dataString = { "text": tweetText }

        const options = {
            url: endpoint,
            headers: {
                "Authorization": `OAuth oauth_consumer_key="${constants.TWITTER.CONSUMER_KEY}",oauth_nonce= ${oauth_nonce},oauth_signature= ${oauth_signature},oauth_signature_method=${constants.TWITTER.SIGNATURE},oauth_timestamp=${oauth_timestamp},oauth_token="${constants.TWITTER.TOKEN}",oauth_version=${constants.TWITTER.OAUTH_VERSION}`,
                "Content-type": 'application/json'
            },
            body: dataString,
            json: true
        }

        request.post(options, (error, response, body) => {
            if(error) logger.error(`error: ${JSON.stringify(error)}`);
            logger.info(`Response & statusCode: ${JSON.stringify(response)}  ${JSON.stringify(response.statusCode)}`);
        });

    },

    generateOauth1Signature: async function (endpoint, timestamp, nonance) {

        parameters = {
            oauth_consumer_key: constants.TWITTER.CONSUMER_KEY,
            oauth_token: constants.TWITTER.TOKEN,
            oauth_nonce: nonance,
            oauth_timestamp: timestamp,
            oauth_signature_method: constants.TWITTER.SIGNATURE,
            oauth_version: constants.TWITTER.OAUTH_VERSION
        },
            consumerSecret = constants.TWITTER.CONSUMER_SECRET,
            tokenSecret = constants.TWITTER.TOKEN_SECRET,
            encodedSignature = oauthSignature.generate('POST', endpoint, parameters, consumerSecret, tokenSecret);
        return encodedSignature;
    }
}