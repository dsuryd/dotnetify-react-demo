using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using DotNetify;

namespace ElectronHelloWorld
{
   public class Startup
   {
      public void ConfigureServices(IServiceCollection services)
      {
         services.AddMemoryCache();
         services.AddSignalR();
         services.AddDotNetify();
      }
      public void Configure(IApplicationBuilder app)
      {
         app.UseWebSockets();
         app.UseSignalR();
         app.UseDotNetify();
         app.Run(async (context) =>
         {
            await context.Response.WriteAsync("HelloWorld server");
         });
      }
   }
}