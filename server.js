// server.js
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const compression = require('compression');

const metaRoutes = require('./routes/meta');
const itemRoutes = require('./routes/item');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const commentRoutes = require('./routes/comment');

const app = express();

//  Connect to mlab database
mongoose.connect('mongodb://learndev-admin:Crm975482x@ds119750.mlab.com:19750/learndevanagari');

// Use Gzip Compression
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default
// Heroku port

const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

app.use('/meta', metaRoutes);
app.use('/item', itemRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/comment', commentRoutes);

app.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});


module.exports = app;