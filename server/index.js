var restify = require('restify');
var {get_buckets, get_silos, add_silos_data} = require('./influx')

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.get('/silos', function(req, res, next) {
    get_buckets().then(function(data){
        res.contentType = 'json';
        res.send(data);
        return next();
    }, function(error){
        res.send(500, {"error": error});
        return next();
    })
});

server.get('/silos/:id', function(req, res, next) {
    get_silos(req.params['id']).then(function(data){
        res.contentType = 'json';
        res.send(data);
        return next();
    }, function(error){
        res.send(500, {"error": error});
        return next();
    })
})

server.post('/silos/:id', function(req, res, next) {
    let id = req.params['id']
    let body = JSON.parse(req.body)
    let key = body.Name
    let value = body.Value

    add_silos_data(id, key, value).then(function(data){
        res.send('Data received from silos ' + id);
        return next();
    }, function(error){
        res.send(500, {"error": error});
        return next();
    })
});

server.listen(8011, function() {
    console.log('%s listening at %s', server.name, server.url);
});
