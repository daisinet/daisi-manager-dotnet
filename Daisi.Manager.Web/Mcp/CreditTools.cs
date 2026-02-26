using Daisi.Protos.V1;
using Daisi.SDK.Clients.V1.Orc;
using ModelContextProtocol.Server;
using System.ComponentModel;
using System.Text.Json;

namespace Daisi.Manager.Web.Mcp
{
    /// <summary>
    /// MCP tools for querying DAISI credit data. Each tool uses the caller's
    /// authenticated identity (via <see cref="McpUserContext"/>) to scope queries
    /// to their account.
    /// </summary>
    [McpServerToolType]
    public class CreditTools
    {
        private static readonly JsonSerializerOptions JsonOptions = new()
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        [McpServerTool(Name = "get_credit_balance"), Description("Get your current credit balance, total earned, spent, purchased, and earn multipliers.")]
        public static string GetCreditBalance(McpUserContext user, CreditClientFactory creditClientFactory)
        {
            var client = creditClientFactory.Create();
            var response = client.GetCreditAccount(new GetCreditAccountRequest
            {
                AccountId = user.AccountId
            });

            var account = response.Account;
            var result = new
            {
                accountId = account.AccountId,
                balance = account.Balance,
                totalEarned = account.TotalEarned,
                totalSpent = account.TotalSpent,
                totalPurchased = account.TotalPurchased,
                tokenEarnMultiplier = account.TokenEarnMultiplier,
                uptimeEarnMultiplier = account.UptimeEarnMultiplier,
                dateCreated = account.DateCreated?.ToDateTime().ToString("o"),
                dateLastUpdated = account.DateLastUpdated?.ToDateTime().ToString("o")
            };

            return JsonSerializer.Serialize(result, JsonOptions);
        }

        [McpServerTool(Name = "get_credit_transactions"), Description("Get paginated credit transaction history.")]
        public static string GetCreditTransactions(
            McpUserContext user,
            CreditClientFactory creditClientFactory,
            [Description("Number of transactions per page (default 20, max 100)")] int pageSize = 20,
            [Description("Page index, starting from 0")] int pageIndex = 0)
        {
            pageSize = Math.Clamp(pageSize, 1, 100);
            pageIndex = Math.Max(pageIndex, 0);

            var client = creditClientFactory.Create();
            var response = client.GetCreditTransactions(new GetCreditTransactionsRequest
            {
                AccountId = user.AccountId,
                PageSize = pageSize,
                PageIndex = pageIndex
            });

            var result = new
            {
                totalCount = response.TotalCount,
                pageSize,
                pageIndex,
                transactions = response.Transactions.Select(t => new
                {
                    id = t.Id,
                    type = t.Type,
                    amount = t.Amount,
                    balance = t.Balance,
                    description = t.Description,
                    relatedEntityId = t.RelatedEntityId,
                    multiplier = t.Multiplier,
                    dateCreated = t.DateCreated?.ToDateTime().ToString("o")
                })
            };

            return JsonSerializer.Serialize(result, JsonOptions);
        }

        [McpServerTool(Name = "get_earnings_summary"), Description("Get earning transactions with a summary aggregated by type.")]
        public static string GetEarningsSummary(
            McpUserContext user,
            CreditClientFactory creditClientFactory,
            [Description("Number of recent earning transactions to include (default 50, max 200)")] int count = 50)
        {
            count = Math.Clamp(count, 1, 200);

            var client = creditClientFactory.Create();
            var response = client.GetCreditTransactions(new GetCreditTransactionsRequest
            {
                AccountId = user.AccountId,
                PageSize = count,
                PageIndex = 0
            });

            // Filter to earning transactions (positive amounts)
            var earnings = response.Transactions
                .Where(t => t.Amount > 0)
                .ToList();

            var byType = earnings
                .GroupBy(t => t.Type)
                .Select(g => new
                {
                    type = g.Key,
                    count = g.Count(),
                    totalAmount = g.Sum(t => t.Amount)
                })
                .OrderByDescending(g => g.totalAmount);

            var result = new
            {
                totalEarnings = earnings.Sum(t => t.Amount),
                earningCount = earnings.Count,
                byType,
                recentEarnings = earnings.Take(10).Select(t => new
                {
                    type = t.Type,
                    amount = t.Amount,
                    description = t.Description,
                    dateCreated = t.DateCreated?.ToDateTime().ToString("o")
                })
            };

            return JsonSerializer.Serialize(result, JsonOptions);
        }

        [McpServerTool(Name = "get_spending_summary"), Description("Get spending transactions with a summary aggregated by type.")]
        public static string GetSpendingSummary(
            McpUserContext user,
            CreditClientFactory creditClientFactory,
            [Description("Number of recent spending transactions to include (default 50, max 200)")] int count = 50)
        {
            count = Math.Clamp(count, 1, 200);

            var client = creditClientFactory.Create();
            var response = client.GetCreditTransactions(new GetCreditTransactionsRequest
            {
                AccountId = user.AccountId,
                PageSize = count,
                PageIndex = 0
            });

            // Filter to spending transactions (negative amounts)
            var spending = response.Transactions
                .Where(t => t.Amount < 0)
                .ToList();

            var byType = spending
                .GroupBy(t => t.Type)
                .Select(g => new
                {
                    type = g.Key,
                    count = g.Count(),
                    totalAmount = g.Sum(t => t.Amount)
                })
                .OrderBy(g => g.totalAmount);

            var result = new
            {
                totalSpending = spending.Sum(t => t.Amount),
                spendingCount = spending.Count,
                byType,
                recentSpending = spending.Take(10).Select(t => new
                {
                    type = t.Type,
                    amount = t.Amount,
                    description = t.Description,
                    dateCreated = t.DateCreated?.ToDateTime().ToString("o")
                })
            };

            return JsonSerializer.Serialize(result, JsonOptions);
        }
    }
}
