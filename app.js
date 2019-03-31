const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
  res.render('index', { list: ['a', 'b', 'c'] });
});

// configure views and templating engine
app.set('views', './src/views');
app.set('view engine', 'pug');

app.listen(port, () => {
  debug(chalk.green(`Server is listening on port ${port}...`));
});
