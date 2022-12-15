namespace NetCoreClient.ValueObjects
{
    internal class Pressione
    {
        public int Value { get; private set; }

        public string Name { get; private set; }

        public Pressione(int value, string Name)
        {
            this.Value = value;
            this.Name = Name;
        }

    }
}
