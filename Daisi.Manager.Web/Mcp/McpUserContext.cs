namespace Daisi.Manager.Web.Mcp
{
    /// <summary>
    /// Scoped service holding the authenticated MCP user identity.
    /// Populated by <see cref="McpBearerAuthMiddleware"/> when a valid Bearer token is present.
    /// </summary>
    public class McpUserContext
    {
        public string AccountId { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string ClientKey { get; set; } = string.Empty;
    }
}
