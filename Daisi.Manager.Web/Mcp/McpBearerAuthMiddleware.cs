namespace Daisi.Manager.Web.Mcp
{
    /// <summary>
    /// Request middleware scoped to <c>/mcp</c> paths. Extracts a Bearer token from the
    /// Authorization header, validates it via <see cref="IMcpTokenValidator"/>, and populates
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

        public async Task InvokeAsync(HttpContext context, McpUserContext mcpUserContext, IMcpTokenValidator tokenValidator)
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

            // Validate token
            try
            {
                var result = tokenValidator.Validate(clientKey);

                if (result is null)
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Invalid client key.");
                    return;
                }

                // Populate scoped McpUserContext
                mcpUserContext.AccountId = result.AccountId;
                mcpUserContext.UserId = result.UserId;
                mcpUserContext.UserName = result.UserName;
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
    }
}
