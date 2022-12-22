var {InfluxDB, Point} = require('@influxdata/influxdb-client')
require('dotenv').config();

const url = process.env.URL
const token = process.env.TOKEN
const bucket = process.env.BUCKET
const org = process.env.ORG

const client = new InfluxDB({url, token})

function get_buckets() {
    return new Promise(function(resolve, reject) {
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
                reject(error)
            },
            complete: () => {
                resolve(data)
            },
        })
    })
}


function get_silos(id){
    return new Promise(function(resolve, reject){
        let queryClient = client.getQueryApi(org)
        let fluxQuery = `from(bucket: "${bucket}")
        |> range(start: -20m)
        |> filter(fn: (r) => r._measurement == "silos#${id}")
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
                reject(error)
            },
            complete: () => {
                resolve(data)
            },
        })
    })
}


function add_silos_data(id, key, value){
    return new Promise(function(resolve, reject){
        try{
            let writeClient = client.getWriteApi(org, bucket, 'ns')

            let point = new Point(`silos#${id}`)
            .intField(key, value)

            writeClient.writePoint(point)
            writeClient.flush()

            resolve()
        } catch(e){
            reject(e)
        }
    })
}

exports.get_buckets = get_buckets
exports.get_silos = get_silos
exports.add_silos_data = add_silos_data