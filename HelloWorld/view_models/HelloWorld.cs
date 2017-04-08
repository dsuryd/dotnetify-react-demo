using System;
using System.Threading;
using DotNetify;

namespace helloworld
{
    public class HelloWorld : BaseVM
    {
        private Timer _timer;
        public string Greetings => "Hello World!";
        public string ServerTime => DateTime.Now.ToString();

        public HelloWorld()
        {
            _timer = new Timer(state =>
            {
                Changed(nameof(ServerTime));
                PushUpdates();
            }, null, 0, 1000);
        }
        public override void Dispose() => _timer.Dispose();
    }
}