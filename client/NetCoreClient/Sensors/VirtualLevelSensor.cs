using NetCoreClient.ValueObjects;
using System.Text.Json;

namespace NetCoreClient.Sensors
{
    class VirtualLevelSensor : ILevelSensorInterface, ISensorInterface
    {
        private readonly Random Random;

        public VirtualLevelSensor()
        {
            Random = new Random();
        }

        public int Level()
        {
            return new Level(Random.Next(100)).Value;
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(Level());
        }
    }
}
