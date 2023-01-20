using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RabbitMQ.Client;


namespace NetCoreClient.Protocols
{
    internal class Amqt : ProtocolInterface
    {
        private readonly string amqpIp;

        public Amqt(string ip){
            amqpIp = ip;
        }

        public void Send(string data, string sensor)
        {
            
            var factory = new ConnectionFactory() { HostName = amqpIp, UserName="user", Password="password"};
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "silos",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                
                var body = Encoding.UTF8.GetBytes(data);

                channel.BasicPublish(exchange: "silos",
                                     routingKey: "",
                                     basicProperties: null,
                                     body: body);
                Console.WriteLine(" [x] Sent {0}", data);
            }

        }
    }
    
}
