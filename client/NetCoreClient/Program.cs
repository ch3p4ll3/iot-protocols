using NetCoreClient.Sensors;
using NetCoreClient.Protocols;

// define sensors
List<ISensorInterface> sensors = new();
sensors.Add(new VirtualLevelSensor("Sensorelivello"));
sensors.Add(new Temperaturesensor("Sensoretemperatura"));
sensors.Add(new Pressionesensor("Sensorepressione"));

// define protocol
ProtocolInterface protocol = new Amqt("10.8.128.4");

// send data to server
while (true)
{
    foreach (ISensorInterface sensor in sensors)
    {
        var sensorValue = sensor.ToJson();

        protocol.Send(sensorValue, sensor.GetSlug());

        Console.WriteLine("Data sent: " + sensorValue);

        Thread.Sleep(1000);
    }

}