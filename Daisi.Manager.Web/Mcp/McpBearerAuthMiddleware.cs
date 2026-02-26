using Daisi.Protos.V1;
using Daisi.SDK.Clients.V1.Orc;
using Daisi.SDK.Interfaces.Authentication;
using Daisi.SDK.Models;

namespace Daisi.Manager.Web.Mcp
{
    /// <summary>
    /// Request middleware scoped to <c>/mcp</c> paths. Extracts a Bearer token from the
    /// Authorization header, validates it against the ORC, and populates
    /// <see cref="McpUserContext"/> and <c>HttpContext.Items["McpClientKey"]</c>.
    /// Returns 401 for invalid or missing tokens on MCP paths.
    /// </summary>
    public class McpBearerAuthMiddleware
    {
        private readonly RequestDelegate _next;

        public McpBearerAuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, McpUserContext mcpUserContext)
        {
            var path = context.Request.Path.Value ?? "";

            // Only intercept MCP paths
            if (!path.StartsWith("/mcp", StringComparison.OrdinalIgnoreCase))
            {
                await _next(context);
                return;
            }

            // Extract Bearer token
            var authHeader = context.Request.Headers.Authorization.ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Missing or invalid Authorization header. Use: Bearer <client-key>");
                return;
            }

            var clientKey = authHeader["Bearer ".Length..].Trim();
            if (string.IsNullOrEmpty(clientKey))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Empty Bearer token.");
                return;
            }

            // Validate against ORC using a temporary key provider
            try
            {
                var tempProvider = new InlineClientKeyProvider(clientKey);
                var authClient = new AuthClientFactory(tempProvider).Create();
                var response = authClient.ValidateClientKey(new ValidateClientKeyRequest
                {
                    SecretKey = DaisiStaticSettings.SecretKey ?? "",
                    ClientKey = clientKey
                });

                if (response is null || !response.IsValid)
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Invalid client key.");
                    return;
                }

                // Populate scoped McpUserContext
                mcpUserContext.AccountId = response.HasUserAccountId ? response.UserAccountId : "";
                mcpUserContext.UserId = response.HasUserId ? response.UserId : "";
                mcpUserContext.UserName = response.HasUserName ? response.UserName : "";
                mcpUserContext.ClientKey = clientKey;

                // Store for HybridClientKeyProvider
                context.Items["McpClientKey"] = clientKey;
            }
            catch
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unable to validate client key.");
                return;
            }

            await _next(context);
        }

        /// <summary>
        /// Temporary <see cref="IClientKeyProvider"/> that returns a fixed client key.
        /// Used to create an AuthClient for validating the Bearer token.
        /// </summary>
        private class InlineClientKeyProvider(string clientKey) : IClientKeyProvider
        {
            public string GetClientKey() => clientKey;
        }
    }
}
