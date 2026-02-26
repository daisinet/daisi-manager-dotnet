using Blazored.Toast;
using Daisi.Manager.Shared.Services;
using Daisi.Manager.Web.Components;
using Daisi.Manager.Web.Mcp;
using Daisi.Manager.Web.Services;
using Daisi.SDK.Interfaces.Authentication;
using Daisi.SDK.Models;
using Daisi.SDK.Web.Extensions;
using MudBlazor.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services.AddSingleton<IFormFactor, FormFactor>();
builder.Services.AddBlazoredToast();
builder.Services.AddMudServices();
builder.Services.AddHttpClient();

builder.Services.AddDaisiForWeb()
                .AddDaisiMiddleware();

// Replace cookie-only key provider with hybrid (Bearer + cookie) provider
builder.Services.AddScoped<IClientKeyProvider, HybridClientKeyProvider>();

// MCP server services
builder.Services.AddScoped<McpUserContext>();
builder.Services.AddMcpServer()
    .WithHttpTransport()
    .WithToolsFromAssembly();

var app = builder.Build();

// MCP Bearer auth must run before DaisiMiddleware
app.UseMiddleware<McpBearerAuthMiddleware>();

app.UseDaisiMiddleware();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseHttpsRedirection();

app.UseAntiforgery();

app.MapStaticAssets();

app.MapMcp();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .AddAdditionalAssemblies(
        typeof(Daisi.Manager.Shared._Imports).Assembly);

DaisiStaticSettings.LoadFromConfiguration(builder.Configuration.AsEnumerable().ToDictionary(keySelector: x => x.Key, elementSelector: x => x.Value));

app.Run();
