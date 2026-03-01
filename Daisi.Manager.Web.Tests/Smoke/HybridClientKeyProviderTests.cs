using Daisi.Manager.Web.Mcp;
using Daisi.SDK.Web.Services;
using Microsoft.AspNetCore.Http;

namespace Daisi.Manager.Web.Tests.Smoke
{
    public class HybridClientKeyProviderTests
    {
        private static IHttpContextAccessor CreateAccessor(HttpContext? context)
        {
            var accessor = new HttpContextAccessor { HttpContext = context };
            return accessor;
        }

        [Fact]
        public void GetClientKey_BearerPath_ReturnsKeyFromItems()
        {
            var context = new DefaultHttpContext();
            context.Items["McpClientKey"] = "bearer-key-123";

            var provider = new HybridClientKeyProvider(CreateAccessor(context));

            Assert.Equal("bearer-key-123", provider.GetClientKey());
        }

        [Fact]
        public void GetClientKey_CookiePath_ReturnsKeyFromCookie()
        {
            var context = new DefaultHttpContext();
            context.Request.Headers["Cookie"] = $"{AuthService.CLIENT_KEY_STORAGE_KEY}=cookie-key-456";

            var provider = new HybridClientKeyProvider(CreateAccessor(context));

            Assert.Equal("cookie-key-456", provider.GetClientKey());
        }

        [Fact]
        public void GetClientKey_BothPresent_BearerTakesPriority()
        {
            var context = new DefaultHttpContext();
            context.Items["McpClientKey"] = "bearer-key";
            context.Request.Headers["Cookie"] = $"{AuthService.CLIENT_KEY_STORAGE_KEY}=cookie-key";

            var provider = new HybridClientKeyProvider(CreateAccessor(context));

            Assert.Equal("bearer-key", provider.GetClientKey());
        }

        [Fact]
        public void GetClientKey_NoContext_ReturnsEmpty()
        {
            var provider = new HybridClientKeyProvider(CreateAccessor(null));

            Assert.Equal(string.Empty, provider.GetClientKey());
        }

        [Fact]
        public void GetClientKey_EmptyBearerKey_FallsThroughToCookie()
        {
            var context = new DefaultHttpContext();
            context.Items["McpClientKey"] = "";
            context.Request.Headers["Cookie"] = $"{AuthService.CLIENT_KEY_STORAGE_KEY}=cookie-key";

            var provider = new HybridClientKeyProvider(CreateAccessor(context));

            Assert.Equal("cookie-key", provider.GetClientKey());
        }

        [Fact]
        public void GetClientKey_NullBearerKey_FallsThroughToCookie()
        {
            var context = new DefaultHttpContext();
            context.Items["McpClientKey"] = null;
            context.Request.Headers["Cookie"] = $"{AuthService.CLIENT_KEY_STORAGE_KEY}=cookie-key";

            var provider = new HybridClientKeyProvider(CreateAccessor(context));

            Assert.Equal("cookie-key", provider.GetClientKey());
        }

        [Fact]
        public void GetClientKey_NeitherPresent_ReturnsEmpty()
        {
            var context = new DefaultHttpContext();

            var provider = new HybridClientKeyProvider(CreateAccessor(context));

            Assert.Equal(string.Empty, provider.GetClientKey());
        }

        [Fact]
        public void GetClientKey_NonStringItemsValue_FallsThroughToCookie()
        {
            var context = new DefaultHttpContext();
            context.Items["McpClientKey"] = 12345; // not a string
            context.Request.Headers["Cookie"] = $"{AuthService.CLIENT_KEY_STORAGE_KEY}=cookie-key";

            var provider = new HybridClientKeyProvider(CreateAccessor(context));

            Assert.Equal("cookie-key", provider.GetClientKey());
        }
    }
}
