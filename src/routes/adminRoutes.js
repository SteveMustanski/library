const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [
  {
    title: "Hitchiker's Guide to the Galaxy",
    genre: 'Science Fiction',
    author: 'Douglas Adams',
    read: false,
  },
  {
    title: 'The Lord of the Rings',
    genre: 'Fantasy',
    author: 'JRR Tolkien',
    read: false,
  },
  {
    title: 'Atlas Shrugged',
    genre: 'Fiction',
    author: 'Ayn Rand',
    read: false,
  },
];

// function router(nav) {
function router() {
  adminRouter.route('/').get((req, res) => {
    const url = 'mongoDB://localhost:27017';
    const dbName = 'libraryApp';

    // eslint-disable-next-line wrap-iife
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to Mongo Server');
        const db = client.db(dbName);
        const response = await db.collection('books').insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    })();
  });
  return adminRouter;
}

module.exports = router;
