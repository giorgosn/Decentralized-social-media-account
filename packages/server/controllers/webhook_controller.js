module.exports = {

    postEvent: async function (req, res) {
        const source = req.params.source || null;
        if(source!=null && source==="snapshot") {
            res.status(200).json({message: 'Successfully recieved event from snaphot'})
        }
        else res.status(404).json({message: 'Unknown soure. This source is not yet supported'})
        console.log("-------------------------------");

        console.log(req);
        console.log("-------------------------------");
       
    },

    receivedEvent: async function (req, res) {
        const source = req.params.source;
        console.log(`Received the following event from ${source}`);
        res.status(200).json('Received successfully');
    }

}