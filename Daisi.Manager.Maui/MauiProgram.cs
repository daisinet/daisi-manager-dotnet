using Blazored.LocalStorage;
using Daisi.Manager.Services;
using Daisi.Manager.Shared.Services;
using Daisi.SDK.Extensions;
using Daisi.SDK.Web.Services;
using Microsoft.Extensions.Logging;

namespace Daisi.Manager
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                });

            // Add device-specific services used by the Daisi.Manager.Shared project
            builder.Services.AddSingleton<IFormFactor, FormFactor>();

            builder.Services.AddMauiBlazorWebView();

#if DEBUG
            builder.Services.AddBlazorWebViewDeveloperTools();
            builder.Logging.AddDebug();

            Daisi.SDK.Models.DaisiStaticSettings.OrcIpAddressOrDomain = "localhost";
            Daisi.SDK.Models.DaisiStaticSettings.OrcPort = 5000;            
#endif
            Daisi.SDK.Models.DaisiStaticSettings.ClientKey = "client";
            builder.Services.AddDaisiClients();
            builder.Services.AddBlazoredLocalStorage();
            builder.Services.AddSingleton<AuthService>();

            return builder.Build();
        }
    }
}
