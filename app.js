const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 1337;

const index = require('./routes/index');
const data = require("./routes/data");

// Cross-Origing Resources Sharing
app.use(cors());

// Using POST, PUT and DELETE with parameters (body-parser)
app.use(express.json());

// Logger middleware function
if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// Middleware called for all routes.
app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.path);
  next();
});

// Routes
app.use('/', index);
app.use('/data', data);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
      return next(err);
  }

  res.status(err.status || 500).json({
      "errors": [
          {
              "status": err.status,
              "title":  err.message,
              "detail": err.message
          }
      ]
  });
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
