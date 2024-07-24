const redisClient = require('./config');

module.exports = async function (req, res) {
    const userId = req.params.id;
    const data = req.body;

    try {
        const results = await redisClient.set(userId, JSON.stringify(data));
        res.send({ results });
    } catch (error) {
        console.error(error);
        res.status(501).send('Data not set');
    }
};
