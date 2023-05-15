const express = require('express');
const redis = require('redis');
const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const client = redis.createClient(configs.redis);
  client.on('error', (err) => {
    console.log('Error ' + err);
  });

  client.get('visits', (err, reply) => {
    if (err) {
      console.log(err)
    }

    res.send({
      visits: reply
    });
  });
});

module.exports = router;
