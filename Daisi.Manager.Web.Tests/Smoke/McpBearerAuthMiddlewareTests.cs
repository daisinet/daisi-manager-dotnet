using Daisi.Manager.Web.Mcp;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Daisi.Manager.Web.Tests.Smoke
{
    public class McpBearerAuthMiddlewareTests
    {
        private static (McpBearerAuthMiddleware middleware, McpUserContext userContext, IMcpTokenValidator validator) CreateMiddleware(
            RequestDelegate? next = null, IMcpTokenValidator? validator = null)
        {
            var userContext = new McpUserContext();
            next ??= _ => Task.CompletedTask;
            var middleware = new McpBearerAuthMiddleware(next);
            validator ??= new RejectAllValidator();
            return (middleware, userContext, validator);
        }

        private static DefaultHttpContext CreateHttpContext(string path, string? authHeader = null)
        {
            var context = new DefaultHttpContext();
            context.Request.Path = path;
            if (authHeader is not null)
                context.Request.Headers.Authorization = authHeader;

            var services = new ServiceCollection();
            services.AddScoped<McpUserContext>();
            context.RequestServices = services.BuildServiceProvider();

            return context;
        }

        /// <summary>Validator that rejects all tokens (returns null).</summary>
        private class RejectAllValidator : IMcpTokenValidator
        {
            public McpTokenValidationResult? Validate(string clientKey) => null;
        }

        /// <summary>Validator that accepts a specific token and returns test data.</summary>
        private class AcceptTokenValidator(string validToken) : IMcpTokenValidator
        {
            public McpTokenValidationResult? Validate(string clientKey)
                => clientKey == validToken
                    ? new McpTokenValidationResult { AccountId = "acct-1", UserId = "user-1", UserName = "Test User" }
                    : null;
        }

        #region Non-MCP paths pass through

        [Fact]
        public async Task NonMcpPath_PassesThrough()
        {
            var nextCalled = false;
            var (middleware, userContext, validator) = CreateMiddleware(_ =>
            {
                nextCalled = true;
                return Task.CompletedTask;
            });

            var context = CreateHttpContext("/account/login");
            await middleware.InvokeAsync(context, userContext, validator);

            Assert.True(nextCalled);
        }

        [Fact]
        public async Task RootPath_PassesThrough()
        {
            var nextCalled = false;
            var (middleware, userContext, validator) = CreateMiddleware(_ =>
            {
                nextCalled = true;
                return Task.CompletedTask;
            });

            var context = CreateHttpContext("/");
            await middleware.InvokeAsync(context, userContext, validator);

            Assert.True(nextCalled);
        }

        [Theory]
        [InlineData("/blazor")]
        [InlineData("/api/data")]
        [InlineData("/account/credits")]
        [InlineData("/integrations")]
        public async Task NonMcpPaths_DoNotRequireAuth(string path)
        {
            var nextCalled = false;
            var (middleware, userContext, validator) = CreateMiddleware(_ =>
            {
                nextCalled = true;
                return Task.CompletedTask;
            });

            var context = CreateHttpContext(path);
            await middleware.InvokeAsync(context, userContext, validator);

            Assert.True(nextCalled);
            Assert.NotEqual(401, context.Response.StatusCode);
        }

        #endregion

        #region MCP path auth checks

        [Fact]
        public async Task McpPath_NoAuthHeader_Returns401()
        {
            var nextCalled = false;
            var (middleware, userContext, validator) = CreateMiddleware(_ =>
            {
                nextCalled = true;
                return Task.CompletedTask;
            });

            var context = CreateHttpContext("/mcp");
            await middleware.InvokeAsync(context, userContext, validator);

            Assert.False(nextCalled);
            Assert.Equal(401, context.Response.StatusCode);
        }

        [Fact]
        public async Task McpPath_NonBearerScheme_Returns401()
        {
            var nextCalled = false;
            var (middleware, userContext, validator) = CreateMiddleware(_ =>
            {
                nextCalled = true;
                return Task.CompletedTask;
            });

            var context = CreateHttpContext("/mcp", "Basic dXNlcjpwYXNz");
            await middleware.InvokeAsync(context, userContext, validator);

            Assert.False(nextCalled);
            Assert.Equal(401, context.Response.StatusCode);
        }

        [Fact]
        public async Task McpPath_EmptyBearerToken_Returns401()
        {
            var nextCalled = false;
            var (middleware, userContext, validator) = CreateMiddleware(_ =>
            {
                nextCalled = true;
                return Task.CompletedTask;
            });

            var context = CreateHttpContext("/mcp", "Bearer ");
            await middleware.InvokeAsync(context, userContext, validator);

            Assert.False(nextCalled);
            Assert.Equal(401, context.Response.StatusCode);
        }

        [Fact]
        public async Task McpPath_BearerOnly_Returns401()
        {
            var nextCalled = false;
            var (middleware, userContext, validator) = CreateMiddleware(_ =>
            {
                nextCalled = true;
                return Task.CompletedTask;
            });

            var context = CreateHttpContext("/mcp", "Bearer");
            await middleware.InvokeAsync(context, userContext, validator);

            Assert.False(nextCalled);
            Assert.Equal(401, context.Response.StatusCode);
        }

        [Fact]
        public async Task McpSubpath_NoAuth_Returns401()
        {
            var nextCalled = false;
            var (middleware, userContext, validator) = CreateMiddleware(_ =>
            {
                nextCalled = true;
                return Task.CompletedTask;
            });

            var context = CreateHttpContext("/mcp/sse");
            await middleware.InvokeAsync(context, userContext, validator);

            Assert.False(nextCalled);
            Assert.Equal(401, context.Response.StatusCode);
        }

        [Fact]
        public async Task McpPath_InvalidToken_Returns401()
        {
            var nextCalled = false;
            var (middleware, userContext, validator) = CreateMiddleware(_ =>
            {
                nextCalled = true;
                return Task.CompletedTask;
            });

            var context = CreateHttpContext("/mcp", "Bearer invalid-token");
            await middleware.InvokeAsync(context, userContext, validator);

            Assert.False(nextCalled);
            Assert.Equal(401, context.Response.StatusCode);
        }

        [Fact]
        public async Task McpPath_ValidToken_PopulatesUserContext()
        {
            var nextCalled = false;
            var (middleware, userContext, _) = CreateMiddleware(_ =>
            {
                nextCalled = true;
                return Task.CompletedTask;
            }, new AcceptTokenValidator("valid-key"));

            var context = CreateHttpContext("/mcp", "Bearer valid-key");
            await middleware.InvokeAsync(context, userContext, new AcceptTokenValidator("valid-key"));

            Assert.True(nextCalled);
            Assert.Equal("acct-1", userContext.AccountId);
            Assert.Equal("user-1", userContext.UserId);
            Assert.Equal("Test User", userContext.UserName);
            Assert.Equal("valid-key", userContext.ClientKey);
            Assert.Equal("valid-key", context.Items["McpClientKey"]);
        }

        #endregion

        #region McpUserContext population

        [Fact]
        public async Task McpPath_UserContextNotPopulated_WhenAuthFails()
        {
            var (middleware, userContext, validator) = CreateMiddleware();

            var context = CreateHttpContext("/mcp", "Bearer bad-key");
            await middleware.InvokeAsync(context, userContext, validator);

            Assert.Equal(string.Empty, userContext.AccountId);
            Assert.Equal(string.Empty, userContext.UserId);
            Assert.Equal(string.Empty, userContext.ClientKey);
        }

        [Fact]
        public async Task NonMcpPath_UserContextNotPopulated()
        {
            var (middleware, userContext, validator) = CreateMiddleware();

            var context = CreateHttpContext("/account");
            await middleware.InvokeAsync(context, userContext, validator);

            Assert.Equal(string.Empty, userContext.AccountId);
            Assert.Equal(string.Empty, userContext.UserId);
            Assert.Equal(string.Empty, userContext.ClientKey);
        }

        #endregion

        #region Path matching

        [Theory]
        [InlineData("/MCP")]
        [InlineData("/Mcp")]
        [InlineData("/mcp")]
        public async Task McpPath_CaseInsensitive(string path)
        {
            var (middleware, userContext, validator) = CreateMiddleware();

            var context = CreateHttpContext(path);
            await middleware.InvokeAsync(context, userContext, validator);

            // All should be treated as MCP paths and require auth
            Assert.Equal(401, context.Response.StatusCode);
        }

        #endregion
    }
}
