using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reactive.Linq;
using Rx = System.Reactive.Linq;
using DotNetify;

namespace promise
{
   public class MyChart : BaseVM
   {
      private IDisposable _subscription;
      private Dictionary<string, int[]> _responses = new Dictionary<string, int[]>();

      private struct Response
      {
         public string Source;
         public int[] Payload;
      }

      public IEnumerable<string> CompletedRequests => _responses.Keys;
      public int[] DataArray { get; set; }

      public MyChart()
      {
         var request1Stream = Rx.Observable.FromAsync(() => RequestAsync(3000, 1))
            .Select(resp => new Response { Source = "Request 1 of 3", Payload = resp });

         var request2Stream = Rx.Observable.FromAsync(() => RequestAsync(5000, 4))
            .Select(resp => new Response { Source = "Request 2 of 3", Payload = resp });

         var request3Stream = Rx.Observable.FromAsync(() => RequestAsync(7000, 7))
             .Select(resp => new Response { Source = "Request 3 of 3", Payload = resp });

         _subscription = Rx.Observable
            .Merge(request1Stream, request2Stream, request3Stream)
            .Subscribe(response =>
            // OnNext
            {
               _responses[response.Source] = response.Payload;
               Changed(nameof(CompletedRequests));
               PushUpdates();
            }, 
            // OnCompleted
            () =>
            {
               var result = new List<int>();
               _responses.OrderBy(i => i.Key).ToList().ForEach(i => result.AddRange(i.Value));

               DataArray = result.ToArray();
               Changed(nameof(DataArray));
               PushUpdates();
            });
      }

      public override void Dispose() => _subscription.Dispose();

      private async Task<int[]> RequestAsync(int delay, int startRange)
      {
         await Task.Delay(delay);
         return Enumerable.Range(startRange, 3).ToArray();
      }
   }
}