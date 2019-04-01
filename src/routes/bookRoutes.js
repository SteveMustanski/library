const express = require('express');

const bookRouter = express.Router();

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

bookRouter.route('/').get((reg, res) => {
  res.render('books', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' },
    ],
    title: 'Library',
    books,
  });
});
bookRouter.route('/single').get((reg, res) => {
  res.send('hello single book');
});

module.exports = bookRouter;
