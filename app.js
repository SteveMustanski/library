const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello from the library app');
});

app.listen(port, () => {
  debug(chalk.green(`Server is listening on port ${port}...`));
});
