const express = require('express');
const chalk = require('chalk');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from the library app');
});

app.listen(port, () => {
  console.log(chalk.green(`Server is listening on port ${port}...`));
});
