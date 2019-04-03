const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/').get((reg, res) => {
    const url = 'mongoDB://localhost:27017';
    const dbName = 'libraryApp';

    // eslint-disable-next-line wrap-iife
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to Mongo Server');
        const db = client.db(dbName);
        const col = await db.collection('books');

        const books = await col.find().toArray();

        res.render('bookList', {
          nav,
          title: 'Library',
          books,
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    })();
  });
  bookRouter.route('/:id').get((req, res) => {
    const url = 'mongoDB://localhost:27017';
    const dbName = 'libraryApp';
    const { id } = req.params;

    // eslint-disable-next-line wrap-iife
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to Mongo Server');
        const db = client.db(dbName);
        const col = await db.collection('books');

        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book);
        res.render('book', {
          nav,
          title: 'Library',
          book,
        });
      } catch (err) {
        debug(err.stack);
      }
    })();
  });
  return bookRouter;
}

module.exports = router;
