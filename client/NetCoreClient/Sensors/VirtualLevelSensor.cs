using NetCoreClient.ValueObjects;
using System.Text.Json;

namespace NetCoreClient.Sensors
{
    class VirtualLevelSensor : ILevelSensorInterface, ISensorInterface
    {
        private readonly Random Random;
        private readonly string SensorName;

        public VirtualLevelSensor(string Name)
        {
            Random = new Random();
            SensorName = Name;
        }
        
        public Level Level()
        {
            return new Level(Random.Next(100), SensorName);
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(Level());
        }
    }
}
