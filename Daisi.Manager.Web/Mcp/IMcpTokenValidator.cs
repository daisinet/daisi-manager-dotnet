namespace Daisi.Manager.Web.Mcp
{
    /// <summary>
    /// Validates an MCP Bearer token against the ORC.
    /// </summary>
    public interface IMcpTokenValidator
    {
        /// <summary>
        /// Validates a client key. Returns a populated <see cref="McpTokenValidationResult"/>
        /// if the token is valid, or null if invalid.
        /// </summary>
        McpTokenValidationResult? Validate(string clientKey);
    }

    public class McpTokenValidationResult
    {
        public string AccountId { get; set; } = "";
        public string UserId { get; set; } = "";
        public string UserName { get; set; } = "";
    }
}
