const gqlHelper = require('../utils/gql_utils');
const Constants = require('../config/constants');
const constants = require('../config/constants');
const logger = require('../utils/logger_utils');

module.exports = {

  getHigestVotedChoiceText: async function (proposalId) {
    const voteByChoice = await this.getVoteByChoice(proposalId);
    if (voteByChoice.size === 0) return null;
    const votedYes = voteByChoice.get(1)!=null ? voteByChoice.get(1) : 0;
    const votedNo = voteByChoice.get(2)!=null ? voteByChoice.get(2) : 0;
    logger.info(`VotedYes/VotedNo:  ${votedYes}/${votedNo}`);
    const isPost =  votedYes > votedNo ? true : false;
    logger.info(`Going to post:  ${isPost}`);
    if(isPost) {
      const propsalData = await this.getProposalById(proposalId);
      logger.info(`Proposal Data: ${JSON.stringify(propsalData)}`);
      if("proposals" in propsalData && "title" in propsalData.proposals[0]) {
        return propsalData.proposals[0].body;
      } else return null;
    }
    else return null;
  },

  fetchAllKanariSpaces: async function () {
    const spaceData = await this.getAllSpaces();
    let results = {
      spaces: {}
    }
    for (const space of spaceData.spaces) {
      let proposalData = await this.getAllProposalBySpaces([space.id]);
      if(proposalData.proposals.length > 0) space['proposals'] = proposalData.proposals.length;
      let followData = await this.getAllFollowsBySpaces([space.id]);
      if(followData.follows.length > 0) space['followers'] = followData.follows.length;
      results.spaces[space.id] = space
    }
    return results;
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
  },

  getAllSpaces: async function () {
    const spaceQuery = `
      query Spaces {
        spaces(
        where: { id_in: "kanari.eth" }
        ) {
          id
          name
          avatar
          categories
        }
      }   
    `
    const getQuery = await gqlHelper.formQuery(spaceQuery);
    return await gqlHelper.makeGqlcall(Constants.SNAPSHOT.GQL_ENDPOINT, getQuery);
  },

  getAllProposalBySpaces: async function (spaceNameArray) {
    const proposalQuery = `
      query Proposals {
        proposals(
          where: {
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
  },

  getAllFollowsBySpaces: async function (spaceNameArray) {
    const followQuery = `
    query Follows {
      follows(
        where: {
          space_in: ["kanari.eth"],
        },
        ) {
          id
          follower
          space {
            id
          }
          created
        }
      }  
    `
    const getQuery = await gqlHelper.formQuery(followQuery);
    return await gqlHelper.makeGqlcall(Constants.SNAPSHOT.GQL_ENDPOINT, getQuery);
  },

}