const IORedis = require('ioredis');
const redisClient = new IORedis({
    maxRetriesPerRequest: null
    //   host: null,
    //   port: null,
    //   password: null,
    //   tls: {
    //   ca: fs.readFileSync('LOCAL/PATH/TO/rackspace-ca-2016.pem')
    //   }
});

module.exports = redisClient;
