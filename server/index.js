var restify = require('restify');
var {InfluxDB, Point} = require('@influxdata/influxdb-client')

const url = 'url'
const token = "token"
let bucket = `bucket`
let org = `org`

const client = new InfluxDB({url, token})

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.get('/silos', function(req, res, next) {
    let queryClient = client.getQueryApi(org)
    let fluxQuery = `
    import "influxdata/influxdb/schema"
    schema.measurements(bucket: "${bucket}")`

    let data = []

    queryClient.queryRows(fluxQuery, {
    next: (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row)
        let silo_id = tableObject._value.split("#")[1]
        data.push({"silos": tableObject._value, "ref": "http://localhost:8011/silos/" + silo_id})
    },
    error: (error) => {
        res.send(500, {"error": error});
        return next();
    },
    complete: () => {
        res.contentType = 'json';
        res.send(data);
        return next();
    },
    })
});

server.get('/silos/:id', function(req, res, next) {
    let queryClient = client.getQueryApi(org)
    let fluxQuery = `from(bucket: "${bucket}")
    |> range(start: -20m)
    |> filter(fn: (r) => r._measurement == "silos#${req.params['id']}")
    |> last()`;

    let data = []

    queryClient.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row)

          data.push({
            "sensor": tableObject._field,
            "value": tableObject._value,
            "time": tableObject._time
          })
        },
        error: (error) => {
            res.send(500, {"error": error});
            return next();
        },
        complete: () => {
            res.send(data);
            return next();
        },
      })
});

server.post('/silos/:id', function(req, res, next) {
    let writeClient = client.getWriteApi(org, bucket, 'ns')

    body = JSON.parse(req.body)

    let point = new Point(`silos#${req.params['id']}`)
    .intField(body['Name'], body['Value'])

    writeClient.writePoint(point)
    writeClient.flush() 

    res.send('Data received from silos ' + req.params['id']);

    return next();
});

server.listen(8011, function() {
    console.log('%s listening at %s', server.name, server.url);
});
