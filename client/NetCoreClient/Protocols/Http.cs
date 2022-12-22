using System.Net;

namespace NetCoreClient.Protocols
{
    class Http : ProtocolInterface
    {
        private string Endpoint;
        //private HttpWebRequest httpWebRequest;

        public Http(string endpoint)
        {
            this.Endpoint = endpoint;
        }

        public async void Send(string data, string sensor)
        {
            var client = new HttpClient();

            var result = await client.PostAsync(Endpoint, new StringContent(data));

            Console.Out.WriteLine(result.StatusCode);
        }
    }
}
