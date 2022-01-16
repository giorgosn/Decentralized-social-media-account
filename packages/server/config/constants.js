module.exports = {
    "TWITTER" : {
        "HOST_ENDPOINT": "https://api.twitter.com/2/",
        "CONSUMER_KEY": process.env.CONSUMER_KEY,
        "TOKEN": process.env.OAUTH_TOKEN,
        "CONSUMER_SECRET": process.env.CONSUMER_SECRET,
        "TOKEN_SECRET" : process.env.TOKEN_SECRET,
        "SIGNATURE": "HMAC-SHA1",
        "OAUTH_VERSION": "1.0",
    },
    "SNAPSHOT" : {
        "GQL_ENDPOINT" : "https://hub.snapshot.org/graphql",
        "PROPOSAL_ENDED_EVENT" : "proposal/end",
        "CHOICE": "choice"
    },
    "SOURCES": {
       "SNAPSHOT" : "snapshot"
    }
}