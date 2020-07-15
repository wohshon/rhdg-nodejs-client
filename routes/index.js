var express = require('express');
var router = express.Router();

var infinispan = require('infinispan');


/* GET home page. */
//curl 192.168.0.110:3000/get/async-cache1/hello
router.get('/get/:cacheName/:key', function(req, res, next) {
  var connected = infinispan.client({port: 11222, host: '192.168.0.110'}, {cacheName: req.params.cacheName});
  console.log(connected);
  connected.then(function (client) {
    
    console.log('Connected to '+req.params.cacheName);
    
    var clientGet = client.get(req.params.key);

    var showGet = clientGet.then(
      function(value) { 
        console.log('get(key)=' + value); 
        res.send(value);
      }
      
      );
      return client.disconnect();
    //client.disconnect();
  
  }).catch(function(error) {
  
    console.log("Got error: " + error.message);
  
  });
    

});

//curl 192.168.0.110:3000/get/async-cache1/hello/world

router.get('/put/:cacheName/:key/:val', function(req, res, next) {
  //delibrately read from another server
  var connected = infinispan.client({port: 12222, host: '192.168.0.110'}, {cacheName: req.params.cacheName});
  console.log(connected);
  connected.then(function (client) {
    
    console.log('Connected to '+req.params.cacheName);
    var clientPut = client.put(req.params.key, req.params.val);
    return client.disconnect();
    //client.disconnect();
  
  }).catch(function(error) {
  
    console.log("Got error: " + error.message);
  
  });
    
  res.send("ok- put");
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
