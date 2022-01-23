const gqlHelper = require('../utils/gql_utils');
const Constants = require('../config/constants');
const constants = require('../config/constants');
const logger = require('../utils/logger_utils');

module.exports = {

  getHigestVotedChoiceText: async function (proposalId) {
    const voteByChoice = await this.getVoteByChoice(proposalId);
    if (voteByChoice.size === 0) return null;
    const isPost =  voteByChoice.get(1) > voteByChoice.get(2) ? true : false;
    logger.info(`Going to post:  ${isPost}`);
    if(isPost) {
      const propsalData = await this.getProposalById(proposalId);
      logger.info(`Proposal Data: ${JSON.stringify(propsalData)}`);
      if("proposals" in propsalData && "title" in propsalData.proposals[0]) {
        return propsalData.proposals[0].title;
      } else return null;
    }
    else return null;
  },

  getVoteByChoice: async function (proposalId) {
    const voteQuery = `
        query Votes {
            votes (
              where: {
                proposal: "${proposalId}"
              },
            
            ) {
              id
              voter
              created
              choice
            }
          }
        `
    const getQuery = await gqlHelper.formQuery(voteQuery);
    const voteData = await gqlHelper.makeGqlcall(Constants.SNAPSHOT.GQL_ENDPOINT, getQuery);
    const results = new Map();
    if ("votes" in voteData) {
      voteData.votes.forEach(vote => {
        if (results.has(vote[constants.SNAPSHOT.CHOICE])) {
          results.set(vote[constants.SNAPSHOT.CHOICE], results.get(vote[constants.SNAPSHOT.CHOICE]) + 1);
        } else results.set(vote[constants.SNAPSHOT.CHOICE], 1);
      });
      return results;
    }
    else return results;
  },

  getProposalById: async function (proposalId) {
    const proposalQuery = `
      query Proposals {
        proposals(
          where: {
            id: "${proposalId}",
            space_in: ["kanari.eth"],
          },
        ) {
          id
          title
          body
          choices
          start
          end
          snapshot
          state
          author
        }
      }    
    `
    const getQuery = await gqlHelper.formQuery(proposalQuery);
    return await gqlHelper.makeGqlcall(Constants.SNAPSHOT.GQL_ENDPOINT, getQuery);
  }
}