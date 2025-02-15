const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const app = express();


// open up CORS 
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json())
app.use(morgan('dev'));

// You can place your routes here, feel free to refactor:

app.use('/api/', require('./routes/example'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //wesley removed res.render and replaced it with res.json
    res.json({
        message: err.message,
        error: err
        });
});

module.exports = app;