namespace NetCoreClient.ValueObjects
{
    internal class Level
    {
        public int Value { get; private set; }
        
        public Level(int value)
        {
            this.Value = value;
        }

    }
}
