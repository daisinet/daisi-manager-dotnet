extern alias OrcGrpc;

using Daisi.Manager.Web.Mcp;
using Daisi.Orc.Core.Data;
using Daisi.Orc.Core.Data.Db;
using Daisi.Orc.Core.Data.Models;
using Daisi.SDK.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;
using OrcSessionCleanup = OrcGrpc::Daisi.Orc.Grpc.Background.SessionCleanupService;
using OrcUptimeCredit = OrcGrpc::Daisi.Orc.Grpc.Background.UptimeCreditService;
using OrcSubscriptionRenewal = OrcGrpc::Daisi.Orc.Grpc.Services.SubscriptionRenewalService;

namespace Daisi.Manager.Web.Tests.Integration.Infrastructure
{
    /// <summary>
    /// Shared fixture that starts an in-memory ORC test server (with fake Cosmo)
    /// and a Manager test server pointed at the ORC. Provides an HttpClient for
    /// making requests to the Manager's MCP endpoint.
    /// </summary>
    public class McpIntegrationFixture : IAsyncLifetime
    {
        public const string TestOrcId = "orc-mcp-test";
        public const string TestAccountId = "acct-mcp-test";
        public const string TestUserId = "user-mcp-test";
        public const string TestUserName = "MCP Test User";
        public const string TestSecretKey = "secret-mcp-test";
        public const string ValidClientKey = "client-mcp-valid";
        public const string InvalidClientKey = "client-mcp-invalid";

        // Use a type from the ORC assembly (via extern alias) to avoid Program name conflict
        private WebApplicationFactory<OrcSessionCleanup>? _orcFactory;
        private WebApplicationFactory<Program>? _managerFactory;
        private McpTestCosmo? _testCosmo;

        public HttpClient ManagerClient { get; private set; } = null!;

        public async Task InitializeAsync()
        {
            // --- Start in-memory ORC ---
            _testCosmo = new McpTestCosmo();
            SeedTestData(_testCosmo);

            _orcFactory = new WebApplicationFactory<OrcSessionCleanup>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureAppConfiguration((context, config) =>
                    {
                        var json = JsonSerializer.Serialize(new
                        {
                            Daisi = new
                            {
                                OrcId = TestOrcId,
                                AccountId = TestAccountId,
                                MaxHosts = "5"
                            }
                        });
                        config.AddJsonStream(new MemoryStream(Encoding.UTF8.GetBytes(json)));
                    });

                    builder.ConfigureServices(services =>
                    {
                        // Replace real Cosmo with test fake
                        var cosmoDescriptor = services.FirstOrDefault(d => d.ServiceType == typeof(Cosmo));
                        if (cosmoDescriptor != null) services.Remove(cosmoDescriptor);
                        services.AddSingleton<Cosmo>(_testCosmo);

                        // Disable all background services to prevent Cosmos DB access
                        var toRemove = services
                            .Where(d => d.ServiceType == typeof(IHostedService))
                            .ToList();
                        foreach (var d in toRemove) services.Remove(d);
                    });
                });

            var orcBaseAddress = _orcFactory.Server.BaseAddress;

            // Configure DaisiStaticSettings so the Manager's gRPC clients
            // can reach the in-memory ORC
            DaisiStaticSettings.SecretKey = TestSecretKey;
            DaisiStaticSettings.OrcUseSSL = false;
            DaisiStaticSettings.OrcIpAddressOrDomain = orcBaseAddress.Host;
            DaisiStaticSettings.OrcPort = orcBaseAddress.Port;

            // --- Start Manager ---
            _managerFactory = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureAppConfiguration((context, config) =>
                    {
                        var json = JsonSerializer.Serialize(new
                        {
                            Daisi = new
                            {
                                OrcIpAddressOrDomain = orcBaseAddress.Host,
                                OrcPort = orcBaseAddress.Port,
                                OrcUseSSL = false,
                                SecretKey = TestSecretKey
                            }
                        });
                        config.AddJsonStream(new MemoryStream(Encoding.UTF8.GetBytes(json)));
                    });

                    builder.ConfigureServices(services =>
                    {
                        // Replace the ORC-based token validator with a test fake
                        var existing = services.FirstOrDefault(d => d.ServiceType == typeof(IMcpTokenValidator));
                        if (existing != null) services.Remove(existing);
                        services.AddSingleton<IMcpTokenValidator>(new McpTestTokenValidator(_testCosmo!));
                    });
                });

            ManagerClient = _managerFactory.CreateClient();
        }

        private static void SeedTestData(McpTestCosmo cosmo)
        {
            // Seed the secret key
            cosmo.Keys["secret-key"] = new AccessKey
            {
                Id = "sk-1",
                Type = KeyTypes.Secret.Name,
                Key = TestSecretKey,
                Owner = new AccessKeyOwner
                {
                    Id = TestOrcId,
                    Name = "Test ORC",
                    SystemRole = Daisi.Protos.V1.SystemRoles.Orc,
                    AccountId = TestAccountId
                }
            };

            // Seed the valid client key
            cosmo.Keys[ValidClientKey] = new AccessKey
            {
                Id = "ck-1",
                Type = KeyTypes.Client.Name,
                Key = ValidClientKey,
                ParentKeyId = "sk-1",
                DateExpires = DateTime.UtcNow.AddDays(30),
                Owner = new AccessKeyOwner
                {
                    Id = TestUserId,
                    Name = TestUserName,
                    SystemRole = Daisi.Protos.V1.SystemRoles.User,
                    AccountId = TestAccountId
                }
            };

            // Seed the ORC record
            cosmo.Orcs[TestOrcId] = new Orchestrator
            {
                Id = TestOrcId,
                AccountId = TestAccountId,
                Name = "test-orc",
                Status = Daisi.Protos.V1.OrcStatus.Online,
                Domain = "localhost",
                Port = 5000,
                RequiresSSL = false,
                Networks = []
            };

            // Seed credit account with known data
            cosmo.CreditAccounts[TestAccountId] = new CreditAccount
            {
                Id = CreditAccount.GetDeterministicId(TestAccountId),
                AccountId = TestAccountId,
                Balance = 5000,
                TotalEarned = 3000,
                TotalSpent = 1000,
                TotalPurchased = 3000,
                TokenEarnMultiplier = 1.5,
                UptimeEarnMultiplier = 2.0,
                DateCreated = DateTime.UtcNow.AddDays(-30),
                DateLastUpdated = DateTime.UtcNow
            };

            // Seed credit transactions
            var now = DateTime.UtcNow;
            cosmo.Transactions.AddRange(new[]
            {
                new CreditTransaction
                {
                    Id = "tx-1", AccountId = TestAccountId,
                    Type = CreditTransactionType.Purchase, Amount = 3000, Balance = 3000,
                    Description = "Purchased 3000 credits", DateCreated = now.AddDays(-10)
                },
                new CreditTransaction
                {
                    Id = "tx-2", AccountId = TestAccountId,
                    Type = CreditTransactionType.TokenEarning, Amount = 500, Balance = 3500,
                    Description = "Token earnings", RelatedEntityId = "inf-1",
                    Multiplier = 1.5, DateCreated = now.AddDays(-5)
                },
                new CreditTransaction
                {
                    Id = "tx-3", AccountId = TestAccountId,
                    Type = CreditTransactionType.UptimeEarning, Amount = 200, Balance = 3700,
                    Description = "Uptime earnings (2 hours)", RelatedEntityId = "host-1",
                    Multiplier = 2.0, DateCreated = now.AddDays(-3)
                },
                new CreditTransaction
                {
                    Id = "tx-4", AccountId = TestAccountId,
                    Type = CreditTransactionType.InferenceSpend, Amount = -500, Balance = 3200,
                    Description = "Inference usage", RelatedEntityId = "inf-2",
                    DateCreated = now.AddDays(-2)
                },
                new CreditTransaction
                {
                    Id = "tx-5", AccountId = TestAccountId,
                    Type = CreditTransactionType.InferenceSpend, Amount = -200, Balance = 3000,
                    Description = "Inference usage", RelatedEntityId = "inf-3",
                    DateCreated = now.AddDays(-1)
                }
            });
        }

        public async Task DisposeAsync()
        {
            ManagerClient?.Dispose();
            _managerFactory?.Dispose();
            _orcFactory?.Dispose();
        }
    }

    /// <summary>
    /// HTTP handler that sets response version to match request version.
    /// Required for gRPC over HTTP/2 with in-memory test server.
    /// </summary>
    public class ResponseVersionHandler : DelegatingHandler
    {
        public ResponseVersionHandler(HttpMessageHandler innerHandler) : base(innerHandler) { }

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var response = await base.SendAsync(request, cancellationToken);
            response.Version = request.Version;
            return response;
        }
    }

    /// <summary>
    /// Minimal in-memory Cosmo fake for MCP integration tests.
    /// Covers auth (key validation) and credits.
    /// </summary>
    public class McpTestCosmo : Cosmo
    {
        public ConcurrentDictionary<string, AccessKey> Keys { get; } = new();
        public ConcurrentDictionary<string, Orchestrator> Orcs { get; } = new();
        public ConcurrentDictionary<string, CreditAccount> CreditAccounts { get; } = new();
        public List<CreditTransaction> Transactions { get; } = new();
        public List<UptimePeriod> UptimePeriods { get; } = new();

        public McpTestCosmo() : base(new ConfigurationBuilder().Build(), "unused") { }

        // --- AccessKeys ---

        public override Task<AccessKey> GetKeyAsync(string key, KeyTypes type)
        {
            var found = Keys.Values.FirstOrDefault(k =>
                k.Key.Equals(key, StringComparison.OrdinalIgnoreCase) && k.Type == type.Name);
            return Task.FromResult(found!);
        }

        public override Task<AccessKey> CreateClientKeyAsync(
            AccessKey secretKey, System.Net.IPAddress? requestorIPAddress,
            AccessKeyOwner owner, List<string>? accessToIds = null)
        {
            var clientKey = new AccessKey
            {
                Type = KeyTypes.Client.Name,
                Key = $"client-test-{Guid.NewGuid():N}",
                Owner = owner,
                ParentKeyId = secretKey.Id,
                DateExpires = DateTime.UtcNow.AddHours(1)
            };
            Keys[clientKey.Key] = clientKey;
            return Task.FromResult(clientKey);
        }

        // --- Orcs ---

        public override Task<Orchestrator> PatchOrcStatusAsync(
            string orcId, Daisi.Protos.V1.OrcStatus status, string? accountId)
        {
            if (Orcs.TryGetValue(orcId, out var orc))
            {
                orc.Status = status;
                return Task.FromResult(orc);
            }
            var newOrc = new Orchestrator { Id = orcId, AccountId = accountId ?? "", Status = status };
            Orcs[orcId] = newOrc;
            return Task.FromResult(newOrc);
        }

        public override Task<Orchestrator> PatchOrcConnectionCountAsync(
            string orcId, int connectionCount, string? accountId)
        {
            if (Orcs.TryGetValue(orcId, out var orc))
            {
                orc.OpenConnectionCount = connectionCount;
                return Task.FromResult(orc);
            }
            var newOrc = new Orchestrator { Id = orcId, AccountId = accountId ?? "", OpenConnectionCount = connectionCount };
            Orcs[orcId] = newOrc;
            return Task.FromResult(newOrc);
        }

        public override Task<PagedResult<Orchestrator>> GetOrcsAsync(
            Daisi.Protos.V1.PagingInfo? paging, string? orcId, string? accountId)
        {
            var items = Orcs.Values
                .Where(o => (orcId == null || o.Id == orcId) && (accountId == null || o.AccountId == accountId))
                .ToList();
            return Task.FromResult(new PagedResult<Orchestrator> { TotalCount = items.Count, Items = items });
        }

        // --- Credits ---

        public override Task<CreditAccount> GetOrCreateCreditAccountAsync(string accountId)
        {
            var account = CreditAccounts.GetOrAdd(accountId, _ => new CreditAccount
            {
                Id = CreditAccount.GetDeterministicId(accountId), AccountId = accountId
            });
            return Task.FromResult(account);
        }

        public override Task<CreditAccount?> GetCreditAccountAsync(string accountId)
        {
            CreditAccounts.TryGetValue(accountId, out var account);
            return Task.FromResult(account);
        }

        public override Task<CreditAccount> UpdateCreditAccountBalanceAsync(CreditAccount creditAccount)
        {
            creditAccount.DateLastUpdated = DateTime.UtcNow;
            CreditAccounts[creditAccount.AccountId] = creditAccount;
            return Task.FromResult(creditAccount);
        }

        public override Task<CreditAccount> PatchCreditAccountMultipliersAsync(
            string accountId, double? tokenMultiplier, double? uptimeMultiplier)
        {
            var account = CreditAccounts.GetOrAdd(accountId, _ => new CreditAccount
            {
                Id = CreditAccount.GetDeterministicId(accountId), AccountId = accountId
            });
            if (tokenMultiplier.HasValue) account.TokenEarnMultiplier = tokenMultiplier.Value;
            if (uptimeMultiplier.HasValue) account.UptimeEarnMultiplier = uptimeMultiplier.Value;
            return Task.FromResult(account);
        }

        public override Task<CreditTransaction> CreateCreditTransactionAsync(CreditTransaction transaction)
        {
            if (string.IsNullOrWhiteSpace(transaction.Id))
                transaction.Id = GenerateId(CreditTransactionIdPrefix);
            Transactions.Add(transaction);
            return Task.FromResult(transaction);
        }

        public override Task<PagedResult<CreditTransaction>> GetCreditTransactionsAsync(
            string accountId, int? pageSize = 20, int? pageIndex = 0)
        {
            var filtered = Transactions
                .Where(t => t.AccountId == accountId && t.Amount != 0)
                .OrderByDescending(t => t.DateCreated)
                .ToList();
            var size = pageSize ?? 20;
            var index = pageIndex ?? 0;
            return Task.FromResult(new PagedResult<CreditTransaction>
            {
                TotalCount = filtered.Count,
                Items = filtered.Skip(index * size).Take(size).ToList()
            });
        }

        public override Task<UptimePeriod> CreateUptimePeriodAsync(UptimePeriod uptimePeriod)
        {
            if (string.IsNullOrWhiteSpace(uptimePeriod.Id))
                uptimePeriod.Id = GenerateId(UptimePeriodIdPrefix);
            UptimePeriods.Add(uptimePeriod);
            return Task.FromResult(uptimePeriod);
        }

        public override Task<List<UptimePeriod>> GetUptimePeriodsAsync(
            string accountId, string? hostId = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            return Task.FromResult(UptimePeriods.Where(p => p.AccountId == accountId).ToList());
        }

        // --- Accounts ---

        public override Task<bool> UserAllowedToLogin(string userId) => Task.FromResult(true);

        // --- Models ---

        public override Task<List<DaisiModel>> GetAllModelsAsync() => Task.FromResult(new List<DaisiModel>());

        public override Task<DaisiModel> CreateModelAsync(DaisiModel model) => Task.FromResult(model);

        // --- Hosts ---

        public override Task<Daisi.Orc.Core.Data.Models.Host?> GetHostAsync(string hostId)
            => Task.FromResult<Daisi.Orc.Core.Data.Models.Host?>(null);

        public override Task<Daisi.Orc.Core.Data.Models.Host> PatchHostForConnectionAsync(Daisi.Orc.Core.Data.Models.Host host)
            => Task.FromResult(host);

        // --- Releases ---

        public override Task<HostRelease?> GetActiveReleaseAsync(string releaseGroup)
            => Task.FromResult<HostRelease?>(null);
    }

    /// <summary>
    /// Test token validator that validates against seeded keys in McpTestCosmo
    /// without making gRPC calls.
    /// </summary>
    public class McpTestTokenValidator : IMcpTokenValidator
    {
        private readonly McpTestCosmo _cosmo;

        public McpTestTokenValidator(McpTestCosmo cosmo) => _cosmo = cosmo;

        public McpTokenValidationResult? Validate(string clientKey)
        {
            var key = _cosmo.Keys.Values.FirstOrDefault(k =>
                k.Key.Equals(clientKey, StringComparison.OrdinalIgnoreCase) &&
                k.Type == KeyTypes.Client.Name);

            if (key is null || key.DateExpires < DateTime.UtcNow)
                return null;

            return new McpTokenValidationResult
            {
                AccountId = key.Owner?.AccountId ?? "",
                UserId = key.Owner?.Id ?? "",
                UserName = key.Owner?.Name ?? ""
            };
        }
    }
}
