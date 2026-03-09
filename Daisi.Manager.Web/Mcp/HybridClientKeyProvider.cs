using Daisi.SDK.Interfaces.Authentication;
using Daisi.SDK.Web.Services;
using Microsoft.AspNetCore.Http;

namespace Daisi.Manager.Web.Mcp
{
    /// <summary>
    /// Checks for a Bearer-derived client key in <c>HttpContext.Items["McpClientKey"]</c> first
    /// (set by <see cref="McpBearerAuthMiddleware"/> for MCP requests), then falls back to the
    /// cookie-based key used by Blazor pages.
    /// </summary>
    public class HybridClientKeyProvider(IHttpContextAccessor httpContextAccessor) : IClientKeyProvider
    {
        public string GetClientKey()
        {
            var context = httpContextAccessor.HttpContext;
            if (context is null)
                return string.Empty;

            // MCP Bearer path — middleware stores the validated key here
            if (context.Items.TryGetValue("McpClientKey", out var mcpKey) && mcpKey is string key && !string.IsNullOrEmpty(key))
                return key;

            // Blazor cookie path — same as CookieClientKeyProvider
            return context.Request.Cookies[AuthService.CLIENT_KEY_STORAGE_KEY] ?? string.Empty;
        }
    }
}
