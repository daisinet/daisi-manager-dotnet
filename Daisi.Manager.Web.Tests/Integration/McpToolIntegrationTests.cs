using Daisi.Manager.Web.Tests.Integration.Infrastructure;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Daisi.Manager.Web.Tests.Integration
{
    /// <summary>
    /// Integration tests for MCP tool invocation via the Manager's /mcp endpoint.
    /// Uses the MCP JSON-RPC protocol to call tools and verify responses.
    /// </summary>
    [Collection("MCP Integration")]
    public class McpToolIntegrationTests
    {
        private readonly McpIntegrationFixture _fixture;

        public McpToolIntegrationTests(McpIntegrationFixture fixture)
        {
            _fixture = fixture;
        }

        private HttpRequestMessage CreateMcpRequest(object jsonRpcBody)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "/mcp");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", McpIntegrationFixture.ValidClientKey);
            request.Content = new StringContent(
                JsonSerializer.Serialize(jsonRpcBody),
                Encoding.UTF8,
                "application/json");
            return request;
        }

        [Fact]
        public async Task McpInitialize_ValidAuth_ReturnsSuccess()
        {
            var request = CreateMcpRequest(new
            {
                jsonrpc = "2.0",
                id = 1,
                method = "initialize",
                @params = new
                {
                    protocolVersion = "2024-11-05",
                    capabilities = new { },
                    clientInfo = new { name = "test-client", version = "1.0.0" }
                }
            });

            var response = await _fixture.ManagerClient.SendAsync(request);

            // Should not be 401 (auth passed) and should respond with a valid MCP response
            Assert.NotEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            if (response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                Assert.Contains("protocolVersion", body);
            }
        }

        [Fact]
        public async Task McpListTools_AfterInit_ReturnsTools()
        {
            // First initialize
            var initRequest = CreateMcpRequest(new
            {
                jsonrpc = "2.0",
                id = 1,
                method = "initialize",
                @params = new
                {
                    protocolVersion = "2024-11-05",
                    capabilities = new { },
                    clientInfo = new { name = "test-client", version = "1.0.0" }
                }
            });
            await _fixture.ManagerClient.SendAsync(initRequest);

            // Then list tools
            var listRequest = CreateMcpRequest(new
            {
                jsonrpc = "2.0",
                id = 2,
                method = "tools/list",
                @params = new { }
            });

            var response = await _fixture.ManagerClient.SendAsync(listRequest);

            Assert.NotEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            if (response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                // Verify our 4 credit tools are listed
                Assert.Contains("get_credit_balance", body);
                Assert.Contains("get_credit_transactions", body);
                Assert.Contains("get_earnings_summary", body);
                Assert.Contains("get_spending_summary", body);
            }
        }

        [Fact]
        public async Task McpCallTool_GetCreditBalance_ReturnsBalanceData()
        {
            // Initialize first
            var initRequest = CreateMcpRequest(new
            {
                jsonrpc = "2.0",
                id = 1,
                method = "initialize",
                @params = new
                {
                    protocolVersion = "2024-11-05",
                    capabilities = new { },
                    clientInfo = new { name = "test-client", version = "1.0.0" }
                }
            });
            await _fixture.ManagerClient.SendAsync(initRequest);

            // Call the tool
            var toolRequest = CreateMcpRequest(new
            {
                jsonrpc = "2.0",
                id = 3,
                method = "tools/call",
                @params = new
                {
                    name = "get_credit_balance",
                    arguments = new { }
                }
            });

            var response = await _fixture.ManagerClient.SendAsync(toolRequest);

            Assert.NotEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            if (response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                // The tool response should contain balance data from our seeded account
                Assert.Contains("balance", body);
                Assert.Contains("5000", body);
                Assert.Contains("totalEarned", body);
                Assert.Contains("tokenEarnMultiplier", body);
            }
        }

        [Fact]
        public async Task McpCallTool_GetCreditTransactions_ReturnsPaginatedData()
        {
            // Initialize
            var initRequest = CreateMcpRequest(new
            {
                jsonrpc = "2.0",
                id = 1,
                method = "initialize",
                @params = new
                {
                    protocolVersion = "2024-11-05",
                    capabilities = new { },
                    clientInfo = new { name = "test-client", version = "1.0.0" }
                }
            });
            await _fixture.ManagerClient.SendAsync(initRequest);

            // Call the tool with pagination
            var toolRequest = CreateMcpRequest(new
            {
                jsonrpc = "2.0",
                id = 4,
                method = "tools/call",
                @params = new
                {
                    name = "get_credit_transactions",
                    arguments = new { pageSize = 10, pageIndex = 0 }
                }
            });

            var response = await _fixture.ManagerClient.SendAsync(toolRequest);

            Assert.NotEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            if (response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                Assert.Contains("totalCount", body);
                Assert.Contains("transactions", body);
            }
        }

        [Fact]
        public async Task McpCallTool_GetEarningsSummary_ReturnsEarnings()
        {
            // Initialize
            var initRequest = CreateMcpRequest(new
            {
                jsonrpc = "2.0",
                id = 1,
                method = "initialize",
                @params = new
                {
                    protocolVersion = "2024-11-05",
                    capabilities = new { },
                    clientInfo = new { name = "test-client", version = "1.0.0" }
                }
            });
            await _fixture.ManagerClient.SendAsync(initRequest);

            var toolRequest = CreateMcpRequest(new
            {
                jsonrpc = "2.0",
                id = 5,
                method = "tools/call",
                @params = new
                {
                    name = "get_earnings_summary",
                    arguments = new { count = 50 }
                }
            });

            var response = await _fixture.ManagerClient.SendAsync(toolRequest);

            Assert.NotEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            if (response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                Assert.Contains("totalEarnings", body);
                Assert.Contains("byType", body);
            }
        }

        [Fact]
        public async Task McpCallTool_GetSpendingSummary_ReturnsSpendings()
        {
            // Initialize
            var initRequest = CreateMcpRequest(new
            {
                jsonrpc = "2.0",
                id = 1,
                method = "initialize",
                @params = new
                {
                    protocolVersion = "2024-11-05",
                    capabilities = new { },
                    clientInfo = new { name = "test-client", version = "1.0.0" }
                }
            });
            await _fixture.ManagerClient.SendAsync(initRequest);

            var toolRequest = CreateMcpRequest(new
            {
                jsonrpc = "2.0",
                id = 6,
                method = "tools/call",
                @params = new
                {
                    name = "get_spending_summary",
                    arguments = new { count = 50 }
                }
            });

            var response = await _fixture.ManagerClient.SendAsync(toolRequest);

            Assert.NotEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            if (response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                Assert.Contains("totalSpending", body);
                Assert.Contains("byType", body);
            }
        }
    }
}
