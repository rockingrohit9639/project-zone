// const redis = require("redis");
// const bluebird = require("bluebird");

// // Convert Redis client API to use promises, to make it usable with async/await syntax
// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

// const redisClient = redis.createClient(6380, process.env.REDISCACHEHOSTNAME, {
//   auth_pass: process.env.REDISCACHEKEY,
//   tls: { servername: process.env.REDISCACHEHOSTNAME },
// });

// module.exports = redisClient;
