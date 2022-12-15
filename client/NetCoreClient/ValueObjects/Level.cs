﻿namespace NetCoreClient.ValueObjects
{
    internal class Level
    {
        public int Value { get; private set; }

        public string Name { get; private set; }
        
        public Level(int value, string Name)
        {
            this.Value = value;
            this.Name = Name;
        }

    }
}
