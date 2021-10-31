const express = require('express');
// Used to avoid newCap linting error.
const routerRef = express.Router;
const router = routerRef();
const quotes = require('../services/quotes');

router.get('/', (req, res, next) => {
  try {
    res.json(quotes.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error getting quotes`, err.message);
    next(err);
  }
});

router.post('/', (req, res, next) => {
  try {
    res.json(quotes.create(req.body));
  } catch (err) {
    console.error(`error while adding quote ${err.message}`);
    next(err);
  }
});

router.put('/', (req, res, next) => {
  try {
    res.json(quotes.updateById(req.body));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    res.json(quotes.deleteById(req.params.id));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/authors/:author', (req, res, next) => {
  try {
    res.json(quotes.deleteByAuthor(req.params.author));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
