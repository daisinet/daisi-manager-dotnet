using Daisi.Protos.V1;
using Daisi.SDK.Clients.V1.Orc;
using Daisi.SDK.Interfaces.Authentication;
using Daisi.SDK.Models;

namespace Daisi.Manager.Web.Mcp
{
    /// <summary>
    /// Validates MCP Bearer tokens by calling the ORC's ValidateClientKey gRPC endpoint.
    /// </summary>
    public class OrcMcpTokenValidator : IMcpTokenValidator
    {
        public McpTokenValidationResult? Validate(string clientKey)
        {
            var tempProvider = new InlineClientKeyProvider(clientKey);
            var authClient = new AuthClientFactory(tempProvider).Create();
            var response = authClient.ValidateClientKey(new ValidateClientKeyRequest
            {
                SecretKey = DaisiStaticSettings.SecretKey ?? "",
                ClientKey = clientKey
            });

            if (response is null || !response.IsValid)
                return null;

            return new McpTokenValidationResult
            {
                AccountId = response.HasUserAccountId ? response.UserAccountId : "",
                UserId = response.HasUserId ? response.UserId : "",
                UserName = response.HasUserName ? response.UserName : ""
            };
        }

        private class InlineClientKeyProvider(string clientKey) : IClientKeyProvider
        {
            public string GetClientKey() => clientKey;
        }
    }
}
