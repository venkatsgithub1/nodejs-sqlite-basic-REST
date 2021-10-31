const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const quotesRouter = require('./routes/quotes');

// need this for express to accept json body.
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.use('/quotes', quotesRouter);

app.listen(port, () => {
  console.log(`Quotes app listening at http://localhost:${port}`);
});
