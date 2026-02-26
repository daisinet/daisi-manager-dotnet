using Daisi.Manager.Web.Tests.Integration.Infrastructure;
using System.Net;
using System.Net.Http.Headers;

namespace Daisi.Manager.Web.Tests.Integration
{
    /// <summary>
    /// Integration tests for the MCP Bearer auth middleware.
    /// Uses a real in-memory ORC test server to validate client keys.
    /// </summary>
    [Collection("MCP Integration")]
    public class McpAuthIntegrationTests
    {
        private readonly McpIntegrationFixture _fixture;

        public McpAuthIntegrationTests(McpIntegrationFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public async Task McpEndpoint_NoAuth_Returns401()
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "/mcp");
            request.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");

            var response = await _fixture.ManagerClient.SendAsync(request);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task McpEndpoint_InvalidToken_Returns401()
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "/mcp");
            request.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", McpIntegrationFixture.InvalidClientKey);

            var response = await _fixture.ManagerClient.SendAsync(request);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task McpEndpoint_ValidToken_DoesNotReturn401()
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "/mcp");
            request.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", McpIntegrationFixture.ValidClientKey);

            var response = await _fixture.ManagerClient.SendAsync(request);

            // The request passes auth and reaches the MCP handler.
            // It may return 400 (bad MCP request) or 200, but NOT 401.
            Assert.NotEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task McpEndpoint_EmptyBearer_Returns401()
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "/mcp");
            request.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");
            request.Headers.TryAddWithoutValidation("Authorization", "Bearer ");

            var response = await _fixture.ManagerClient.SendAsync(request);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task McpEndpoint_BasicAuth_Returns401()
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "/mcp");
            request.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", "dXNlcjpwYXNz");

            var response = await _fixture.ManagerClient.SendAsync(request);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task NonMcpEndpoint_NoAuth_DoesNotReturn401()
        {
            // Non-MCP paths should not be intercepted by the MCP middleware
            var request = new HttpRequestMessage(HttpMethod.Get, "/");

            var response = await _fixture.ManagerClient.SendAsync(request);

            // May redirect to login (302) or return page (200), but NOT 401
            Assert.NotEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}
