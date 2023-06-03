require('dotenv').config()
const express = require("express");
const Sentry = require("@sentry/node");
const app = express();
const port = 8000;

const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const cors = require("cors");

const file = fs.readFileSync('./docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);
const router = require("./routes");

const { SENTRY_DSN, ENVIRONMENT } = process.env;

Sentry.init({
  environment: ENVIRONMENT,
  dsn: SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


app.use(morgan("dev"));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(router);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// 404
app.use((req, res, next) => {
  return res.status(404).json({
    message: "Not Found",
  });
});

// 500
app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
  });
});

//
// app.listen(port, () => console.log("Port " + port + " is running"));
module.exports = app
