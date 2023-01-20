var amqp = require('amqplib/callback_api');
var { add_silos_data } = require('./influx')


const opt = { credentials: require('amqplib').credentials.plain('user', 'password') };

amqp.connect('amqp://localhost', opt, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'silos';

    channel.assertExchange(queue);

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, function(msg) {
        silos_id = "2"

        data = JSON.parse(msg.content.toString())

        console.log(" [x] Received: ", data);

        add_silos_data(silos_id, data.Name, data.Value)
        .then(function(){
            console.log(" [I] Saved on influx")
        })
        .catch(function(e){
            console.log(e)
        })
    },
    
    {
        noAck: true,
    });
  });
});