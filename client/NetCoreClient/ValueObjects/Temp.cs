namespace NetCoreClient.ValueObjects
{
    internal class Temp
    {
        public int Value { get; private set; }

        public string Name { get; private set; }

        public Temp(int value, string Name)
        {
            this.Value = value;
            this.Name = Name;
        }

    }
}
