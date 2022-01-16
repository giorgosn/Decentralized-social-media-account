const gqlRequest = require('graphql-request');

module.exports = {
    makeGqlcall: async function (hostEndpoint, query) {
        return await gqlRequest.request(hostEndpoint, query);
    },

    formQuery: async function(queryString) {
        return gqlRequest.gql`${queryString}`;
    }
    
}

