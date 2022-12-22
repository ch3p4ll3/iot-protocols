using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NetCoreClient.ValueObjects;
using System.Text.Json;

namespace NetCoreClient.Sensors
{

    class Pressionesensor : IPressioneSensorInterface, ISensorInterface
    {
        private readonly Random Random;
        private readonly string SensorName;

        public Pressionesensor(string Name)
        {
            Random = new Random();
            SensorName = Name;
        }

        public Pressione Pressione()
        {
            return new Pressione(Random.Next(100), SensorName);
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(Pressione());
        }
        public string GetSlug()
        {
            return "Pressione";
        }
    }
}
