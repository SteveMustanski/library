const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {
  function getIndex(reg, res) {
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
  }
  function getById(req, res) {
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

        book.details = await bookService.getBookById(book.bookId);

        res.render('book', {
          nav,
          title: 'Library',
          book,
        });
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function middleware(req, res, next) {
    //if (req.user) {
    next();
    //} else {
    //  res.redirect('/');
    // }
  }

  return {
    getIndex,
    getById,
    middleware,
  };
}

module.exports = bookController;
