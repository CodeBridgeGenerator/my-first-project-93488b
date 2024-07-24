const redisClient = require('./config');

module.exports = async function (req, res) {
    const userId = req.params.id;

    try {
        const cacheResults = await redisClient.get(userId);
        const results = JSON.parse(cacheResults);
        res.send({
            results
        });
    } catch (error) {
        console.error(error);
        res.status(404).send('Data unavailable');
    }
};
