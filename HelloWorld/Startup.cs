using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using DotNetify;

namespace dotnetify_react_demo
{
   public class Startup
   {
      public void ConfigureServices(IServiceCollection services)
      {
         services.AddMemoryCache();
         services.AddSignalR();
         services.AddDotNetify();
      }
      public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
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