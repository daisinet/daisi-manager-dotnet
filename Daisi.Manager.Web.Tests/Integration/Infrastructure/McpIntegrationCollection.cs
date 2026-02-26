namespace Daisi.Manager.Web.Tests.Integration.Infrastructure
{
    /// <summary>
    /// Collection definition for MCP integration tests. Shares a single
    /// ORC test server + Manager test server across all tests in the collection.
    /// Tests run serially because DaisiStaticSettings is static/global.
    /// </summary>
    [CollectionDefinition("MCP Integration")]
    public class McpIntegrationCollection : ICollectionFixture<McpIntegrationFixture>
    {
    }
}
