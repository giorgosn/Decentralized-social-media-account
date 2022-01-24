const twitterHelper = require('../utils/twitter_utils');
const snapshotHelper = require('../helpers/snapshot_helper');
const constants = require('../config/constants');
const logger = require('../utils/logger_utils');

module.exports = {

    postEvent: async function (req, res) {
        const source = req.params.source || null;
        logger.info(`Event received: ${JSON.stringify(req.body)}`);
        if(source===constants.SOURCES.SNAPSHOT) {
           const eventType = req.body.ProposalEvent || null;
           let proposalId = req.body.ProposalID || null;
           if(eventType === constants.SNAPSHOT.PROPOSAL_ENDED_EVENT && proposalId!=null) {
                proposalId = proposalId.replace('proposal/','')
                let choiceText = await snapshotHelper.getHigestVotedChoiceText(proposalId);
                logger.info(`The text going on twitter is: ${choiceText}`);
                if(choiceText!=null){
                    await twitterHelper.postTweet(choiceText);
                    res.status(200).json({message: 'Successfully posted event from snaphot'});
                } else  res.status(200).json({message: `Not going to post for the snapshot event with id: ${proposalId}`});
                
           } else res.status(200).json({message: 'Event type not supported for sanpshot source'});
        }
        else res.status(404).json({message: 'Unknown soure. This source is not yet supported'})
    },

    receivedEvent: async function (req, res) {
        const source = req.params.source;
        res.status(200).json('Received successfully');
    }

}