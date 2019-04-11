const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');
const dovEnv = require('dotenv').config();
const keys = require('../../keys');

const parser = xml2js.Parser({ explicitArray: false });

function goodreadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://www.goodreads.com/book/show/${id}.xml?key=${
            keys.goodreads.id
          }`,
        )
        // eslint-disable-next-line arrow-parens
        .then(response => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        // eslint-disable-next-line arrow-parens
        .catch(error => {
          reject(error);
          debug(error);
        });
    });
  }
  return { getBookById };
}

module.exports = goodreadsService();
