const db = require('../services/db');
const config = require('../config');

/**
 *
 * @param {Number} page
 * @return {Object}
 */
function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`select * from quote limit ?, ?`, [
    offset,
    config.listPerPage,
  ]);
  const meta = {page};

  return {
    data,
    meta,
  };
}

/**
 * method to validate if the quote is provided in correct format.
 * @param {object} quote
 */
function validateCreate(quote) {
  const messages = [];
  console.log(quote);

  if (!quote) {
    messages.push('No object provided');
  }

  if (!quote.quote) {
    messages.push('Quote is not provided');
  }

  if (!quote.author) {
    messages.push('Quote author is not provided');
  }

  if (messages.length) {
    const error = new Error(messages.join());
    error.statusCode = 400;
    throw error;
  }
}

/**
 * method to validate if the quote info for update is
 * provided in correct format.
 * @param {object} quoteInfo
 */
function validateUpdateByQuoteId(quoteInfo) {
  const messages = [];
  console.log(quoteInfo);

  if (!quoteInfo) {
    messages.push('No object provided');
  }

  if (!quoteInfo.quoteId) {
    messages.push('Quote ID is not provided');
  }

  if (!quoteInfo.quoteUpdate) {
    messages.push('Quote Update is not provided');
  }

  if (messages.length) {
    const error = new Error(messages.join());
    error.statusCode = 400;
    throw error;
  }
}

/**
 * method to facilitate creation of a quote.
 * @param {Object} quoteObj
 * @return {Object}
 */
function create(quoteObj) {
  validateCreate(quoteObj);
  const {quote, author} = quoteObj;
  const result = db.run(
    `INSERT INTO quote (quote, author) VALUES (@quote, @author)`,
    {quote, author},
  );

  let message = 'Error while creating quote';
  if (result.changes) {
    message = 'Quote created successfully';
  }
  return {message};
}

/**
 *
 * @param {Object} quoteInfo
 * @return {Object}
 */
function updateById(quoteInfo) {
  validateUpdateByQuoteId(quoteInfo);
  const {quoteId, quoteUpdate} = quoteInfo;
  const result = db.run(`UPDATE QUOTE SET quote=@quoteUpdate WHERE id=@id`, {
    quoteUpdate,
    id: quoteId,
  });

  let message = 'Error while updating quote';
  if (result.changes) {
    message = 'Quote updated successfully';
  }
  return {message};
}

/**
 *
 * @param {Number} quoteId
 * @return {Object}
 */
function deleteById(quoteId) {
  if (!quoteId || quoteId < 1) {
    const err = Error('Quote ID is deemed invalid!');
    err.statusCode = 400;
    throw err;
  }
  const result = db.run(`DELETE FROM QUOTE WHERE id=@id`, {
    id: quoteId,
  });

  let message = 'Error while deleting quote';
  if (result.changes) {
    message = 'Quote deleted successfully';
  }
  return {message};
}

/**
 *
 * @param {String} author
 * @return {Object}
 */
function deleteByAuthor(author) {
  if (!author) {
    const err = Error('Author name is deemed invalid!');
    err.statusCode = 400;
    throw err;
  }
  const result = db.run(`DELETE FROM QUOTE WHERE author=@author`, {
    author,
  });

  let message = 'Error while deleting quote';
  if (result.changes) {
    message = 'Quote deleted successfully';
  }
  return {message};
}

module.exports = {
  getMultiple,
  create,
  updateById,
  deleteById,
  deleteByAuthor,
};
