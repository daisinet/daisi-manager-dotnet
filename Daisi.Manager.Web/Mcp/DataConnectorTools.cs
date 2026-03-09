using Daisi.Protos.V1;
using Daisi.SDK.Clients.V1.Orc;
using ModelContextProtocol.Server;
using System.ComponentModel;
using System.Text.Json;

namespace Daisi.Manager.Web.Mcp
{
    /// <summary>
    /// MCP tools for managing data connectors (MCP servers).
    /// Uses the caller's authenticated identity via <see cref="McpUserContext"/>.
    /// </summary>
    [McpServerToolType]
    public class DataConnectorTools
    {
        private static readonly JsonSerializerOptions JsonOptions = new()
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        [McpServerTool(Name = "list_data_connectors"), Description("List all registered MCP data connectors for your account.")]
        public static string ListDataConnectors(McpUserContext user, McpClientFactory mcpClientFactory)
        {
            var client = mcpClientFactory.Create();
            var response = client.ListServers(new ListMcpServersRequest());

            var result = response.Servers.Select(s => new
            {
                id = s.Id,
                name = s.Name,
                serverUrl = s.ServerUrl,
                status = s.Status.ToString().Replace("McpStatus", ""),
                authType = s.AuthType.ToString().Replace("McpAuth", ""),
                resourcesSynced = s.ResourcesSynced,
                discoveredResourceCount = s.DiscoveredResources.Count,
                syncIntervalMinutes = s.SyncIntervalMinutes,
                repositoryId = s.RepositoryId,
                dateCreated = s.DateCreated?.ToDateTime().ToString("o"),
                dateLastSync = s.DateLastSync?.ToDateTime().ToString("o"),
                lastError = s.LastError?.ToString()
            });

            return JsonSerializer.Serialize(new { connectors = result }, JsonOptions);
        }

        [McpServerTool(Name = "get_connector_status"), Description("Get detailed status of a specific MCP data connector.")]
        public static string GetConnectorStatus(
            McpUserContext user,
            McpClientFactory mcpClientFactory,
            [Description("The ID of the MCP server to check")] string serverId)
        {
            var client = mcpClientFactory.Create();
            var response = client.GetServerStatus(new GetMcpServerStatusRequest { ServerId = serverId });

            var result = new
            {
                serverId,
                status = response.Status.ToString().Replace("McpStatus", ""),
                resourcesSynced = response.ResourcesSynced,
                dateLastSync = response.DateLastSync?.ToDateTime().ToString("o"),
                lastError = response.LastError?.ToString()
            };

            return JsonSerializer.Serialize(result, JsonOptions);
        }

        [McpServerTool(Name = "trigger_connector_sync"), Description("Trigger an immediate sync for an MCP data connector.")]
        public static string TriggerConnectorSync(
            McpUserContext user,
            McpClientFactory mcpClientFactory,
            [Description("The ID of the MCP server to sync")] string serverId)
        {
            var client = mcpClientFactory.Create();
            var response = client.TriggerSync(new TriggerMcpSyncRequest { ServerId = serverId });

            var result = new
            {
                serverId,
                success = response.Success,
                error = response.Error?.ToString()
            };

            return JsonSerializer.Serialize(result, JsonOptions);
        }
    }
}
