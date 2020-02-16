const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const clientRoutes = require('./routes/clientRoutes');
const prestationRoutes = require('./routes/prestationRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commandRoutes = require('./routes/commandRoutes');
const billRoutes = require('./routes/billRoutes');
const appointementRoutes = require('./routes/appointementRoutes');
const eventRoutes = require('./routes/eventRoutes');
const globalErrHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const attachEvent = require('./utils/attachEvent');
const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API 
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

//app.use(attachEvent);
// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/prestations', prestationRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/commands', commandRoutes);
app.use('/api/v1/bills', billRoutes);
app.use('/api/v1/appointements', appointementRoutes);
app.use('/api/v1/events', eventRoutes);

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;