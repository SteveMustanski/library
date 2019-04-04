const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp').post((req, res) => {
    const { username, password } = req.body;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    // eslint-disable-next-line wrap-iife
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to mongo db');

        const db = client.db(dbName);
        const col = db.collection('users');
        const user = { username, password };
        const results = await col.insertOne(user);
        debug(results);
        // create user
        req.login(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (err) {
        debug(err.stack);
      }
    })();
    debug(req.body);
  });
  authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
  });
  return authRouter;
}

module.exports = router;
