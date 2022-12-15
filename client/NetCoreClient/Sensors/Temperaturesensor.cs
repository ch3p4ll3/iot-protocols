using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NetCoreClient.ValueObjects;
using System.Text.Json;

namespace NetCoreClient.Sensors
{

    class Temperaturesensor : ITempSensorInterface, ISensorInterface
    {
        private readonly Random Random;
        private readonly string SensorName;

        public Temperaturesensor(string Name)
        {
            Random = new Random();
            SensorName = Name;
        }

        public Temp Temp()
        {
            return new Temp(Random.Next(100), SensorName);
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(Temp());
        }
    }
}
