using NetCoreClient.Sensors;
using NetCoreClient.Protocols;

// define sensors
List<ISensorInterface> sensors = new();
sensors.Add(new VirtualLevelSensor("Sensorelivello"));
sensors.Add(new Temperaturesensor("Sensoretemperatura"));
sensors.Add(new Pressionesensor("Sensorepressione"));

// define protocol
ProtocolInterface protocol = new Mqtt("10.0.20.30");

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