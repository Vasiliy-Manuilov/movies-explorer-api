require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const apiLimiter = require('./middlewares/apiLimiter');
// const cors = require('cors');
const handelError = require('./middlewares/handelError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { PORT, DB_URL } = require('./utils/config');

const app = express();
// app.use(cors({ origin: 'https://list-movies.nomoredomainsicu.ru', credentials: true }));
app.use(requestLogger);
app.use(helmet());
app.use(bodyParser.json());
app.use(apiLimiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handelError);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
