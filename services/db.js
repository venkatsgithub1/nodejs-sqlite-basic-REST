const Sqlite = require('better-sqlite3');
const path = require('path');
const db = new Sqlite(path.resolve('quotes.db'), {fileMustExist: true});

/**
 * method to execute query and return results.
 * @param {string} sql
 * @param {Array} params
 * @return {Object}
 */
function query(sql, params) {
  return db.prepare(sql).all(params);
}

/**
 * method that allows insertion of new quote.
 * @param {string} sql
 * @param {Array} params
 * @return {Object}
 */
function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = {
  query,
  run,
};
