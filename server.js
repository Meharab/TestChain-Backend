var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var router = express.Router();

var blockchain = require('./model/blockchain');
var network = require('./model/network');

blockchain.init();
network.init();

var app = express(),
    server = require('http').createServer(app);
server.listen(9999);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);


router.get('/chain', function(req, res, next) {
  res.send(blockchain.getChain());
});
router.post('/mine', function(req, res, next) {
  var miningNode = req.headers.host;
  if(!network.nodeExists(miningNode)){
    network.registerNode(miningNode);
  }
  res.send(blockchain.mine(req.headers.host));

});

router.get('/nodes', function(req, res, next) {
  res.send(network.getNodes());
});

router.post('/nodes/register', function(req, res, next) {
  res.send(network.registerNode(req.headers.host));
});

router.post('/transactions', function(req, res, next){

});

router.post('/checkChain', function(req, res, next){
  res.send(blockchain.checkChain());
})



app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.log("App.js Error: " , err, req.url);
	res.render('error', {
		message: err.message,
		error: err
	});
});





module.exports = app;
