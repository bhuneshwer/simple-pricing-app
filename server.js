const app = require('express')();
const http = require('http').Server(app);
const environment = "local"; /// hard coded for now, at a later point we should be able to pass it as an argument


var express = require('express')

const fwk = require('./server/utils/fwk').fwk

// body-parser to handle request data
app.use(require('body-parser').json({ limit: '20mb' }));
app.use(require('body-parser').urlencoded({ extended: true }));

// establishing routes 
require('./server/routes/routes').establishRoutes(app);

const port = fwk.config.listening_port || process.env.PORT;

http.listen(port, function() {
    console.log('listening on *:' + port);
});


process.on('uncaughtException', function(err) {
    console.log('Uncaught exception has been handled. Exception caught is ');
    console.log(err.toString());
    console.log(err.stack);
});