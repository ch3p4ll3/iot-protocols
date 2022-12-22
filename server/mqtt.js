const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')
var {add_silos_data} = require('./influx')

client.on('connect', function () {
    console.log("Connesso");
    client.subscribe('silos/#');
})

client.on('message', function (topic, message) {
    let silos_id = topic.split("/")[1]

    let data = JSON.parse(message.toString())

    add_silos_data(silos_id, data.Name, data.Value)
})