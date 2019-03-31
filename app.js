const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
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

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(
  '/css',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')),
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')),
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/jquery/dist')),
);

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
app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' },
    ],
    title: 'Library',
  });
});

// configure views and templating engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(port, () => {
  debug(chalk.green(`Server is listening on port ${port}...`));
});
