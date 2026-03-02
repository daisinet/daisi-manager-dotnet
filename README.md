# Daisi Manager Suite
The DAISI Manager suite is a set of web and MAUI applications that allows users to setup their own accounts, and manage their private networks, hosts, and other imporant account level entities. Works directly with the system Orc using the publicly available SDK project.

## Environment Setup
### User Secrets

Right click on the Daisi.Manager.Web project and select Manage User Secrets. You will need to add some DAISI settings in there for the system to work properly.

```
{
  "Daisi": {
    // Use these settings to point the manager to the public DAISI Orc
    //"OrcIpAddressOrDomain": "orc.daisinet.com",
    //"OrcPort": 443,

    // Use these settings to point the manager to your own private Orc run locally.
    //"OrcIpAddressOrDomain": "localhost",
    //"OrcPort": 5001,

    // All public networks use SSL, but if you want to run your own insecure network without encryption, set this to false.
    "OrcUseSSL": true,

    // This is the secret key provided by the Orc to which you are connecting.
    "SecretKey": "secret-xxx"
  }
}
```
### Secret Keys
To get a SecretKey for your manager to run against the public Orc network, go to the public [Daisi Management Studio](https://manager.daisinet.com). There, set up an App and put the secret key generated in the "SecretKey" value of the User Secrets.

### SSO Configuration
Manager is the **SSO authority** (single login point) for the entire DAISI system. Other web apps like Drive redirect unauthenticated users to Manager, where they log in once and are seamlessly redirected back with an encrypted ticket.

**Required settings**:
- `SsoSigningKey` — Base64-encoded 32-byte AES-256 key. **Must be identical** across all SSO-participating apps (Manager, Drive, etc.).
- `SsoAllowedOrigins` — Comma-separated list of app origins allowed to request SSO tickets (e.g. `https://drive.daisinet.com`).
- `SsoAuthorityUrl` — Manager's own base URL.
- `SsoAppUrl` — Manager's own base URL (same as authority since Manager is the IdP).

**To add a new app to the SSO trust circle**: Add the new app's origin to Manager's `SsoAllowedOrigins`, and configure the new app with the same `SsoSigningKey` and `SsoAuthorityUrl` pointing to Manager.

**Local development User Secrets example**:
```json
{
  "Daisi": {
    "SsoSigningKey": "<base64-32-byte-key>",
    "SsoAuthorityUrl": "https://localhost:7150",
    "SsoAppUrl": "https://localhost:7150",
    "SsoAllowedOrigins": "https://localhost:5201"
  }
}
```
The `SsoSigningKey` must be the same value in all SSO-participating apps' User Secrets. Generate one with: `python -c "import os,base64; print(base64.b64encode(os.urandom(32)).decode())"`

## Admin Models Management

The Admin section includes a models management page at **Admin > Models** (`AdminModelsComponent.razor`). Admins can create, edit, and delete AI models that are distributed to hosts across the network.

**Key features:**
- **Multi-type support** — Models can be assigned multiple types (TextGeneration, ImageGeneration, SpeechToText, etc.)
- **Default per type** — The "Default" toggle now means "default for this model's type(s)." Multiple models can be default as long as they cover different types. The Default column shows a tooltip indicating which types each model is default for.
- **Backend settings** — Per-model backend engine, runtime, context size, GPU layers, and inference defaults.
- **Hot-reload** — When models are added or removed, hosts pick up changes automatically at the next heartbeat (no restart required).
- **Host availability** — The table shows how many hosts currently have each model loaded.
- **Usage stats** — Filterable by time period (day, week, month, year, all time).

## Admin Accounts Dashboard
The Admin section includes a full account management dashboard at **Admin > Accounts**. Admin users can:

- **Browse and search** all accounts with pagination
- **View account details** including resource counts (users, hosts, apps) and credit info
- **Edit account name** directly from the detail page
- **Configure earn multipliers** — adjust token and uptime credit multipliers per account
- **Set storage limits** — configure max file size, total storage, and file count for Drive
- **Adjust credits** — manually add or remove credits with a description for the audit trail
- **Audit credit balance** — recalculate the credit balance from all historical transactions and auto-correct any mismatches

The accounts list is at `/admin/accounts` and each account's detail page is at `/admin/accounts/{id}`.

## Secure Tool Management

The Manager provides UI for both providers creating secure tools and consumers configuring them:

**Provider side** (`EditMarketplaceItem.razor`): When creating a Host Tool marketplace item, providers can enable "Secure Execution" which reveals fields for:
- Endpoint URL and auth key (for ORC-to-provider communication during install/uninstall)
- Tool definition: ID, name, use instructions, tool group
- Call parameters (what the AI provides at execution time)
- Setup parameters (what users must provide: API keys, credentials, etc.)
- **Execution Cost (credits)** — visible when Secure Execution is enabled. Allows providers to set a per-execution credit cost (0 = free). This lets providers monetize tool usage on a per-call basis.

**Consumer side** (`ConfigureSecureTool.razor`): After purchasing a secure tool, users navigate to `/marketplace/configure/{itemId}/{installId}/{bundleInstallId?}` to enter their setup data (API keys, credentials). The Manager calls the provider directly via HTTP — no ORC relay. A security notice explains that credentials go directly to the provider and are never stored on Daisinet servers. When a `BundleInstallId` is present (for plugin-bundled tools), OAuth calls use the bundle ID so all tools in the bundle share OAuth tokens, while non-OAuth setup calls always use the per-tool `InstallId`.

For setup parameters with type `oauth`, the configure page renders a "Connect to [ServiceLabel]" button instead of a text input. Clicking it opens a popup to the provider's `AuthUrl`, which handles the external OAuth consent flow. After authorization, the popup redirects to `/marketplace/oauth-callback` (a simple "Connection Successful" page that auto-closes). The configure page polls the provider's `/auth/status` endpoint every 3 seconds until the connection shows as active.

**OAuth callback** (`OAuthCallback.razor`): Minimal page at `/marketplace/oauth-callback` that shows a success message and auto-closes the popup window after 1.5 seconds.

**My Purchases** (`MyPurchases.razor`): Purchased secure tools show a "Configure" button that includes the `SecureInstallId` and optionally `BundleInstallId` from the purchase record in the URL, enabling direct provider communication with shared OAuth support for plugin bundles.

## Plugin Bundle Creation

Plugins are marketplace items that bundle multiple tools and skills into a single installable package. Providers create plugins through the Edit Marketplace Item page (`EditMarketplaceItem.razor`).

**Creating a plugin bundle:**
1. Navigate to **Marketplace > Provider Dashboard > Create New Item**
2. Select **Plugin** as the item type — a "Bundled Items" section appears
3. The dropdown lists all non-Plugin items (Skills, Bot Tools, Host Tools) published under your provider account
4. Select items from the dropdown to add them to the bundle — they appear as removable badges
5. Optionally upload a ZIP package and configure pricing
6. Save or submit for review — the selected item IDs are persisted as `BundledItemIds`

**Viewing a plugin's bundled items:** The marketplace item detail page (`MarketplaceItemDetail.razor`) lists each bundled item by name and type, with links to their individual detail pages. When a user purchases a plugin, the system generates a shared `BundleInstallId` so all bundled tools can share OAuth tokens during configuration.

**Execution cost display:** The marketplace item detail page (`MarketplaceItemDetail.razor`) shows execution cost in the pricing card when the item has `IsSecureExecution` enabled and `ExecutionCreditCost > 0`. This lets consumers see the per-execution credit cost before purchasing.

## News Article Management
The Admin section includes a full news/blog article management page at **Admin > News**. Admin users can:

- **Browse and search** all published articles
- **Create new articles** with a title, author, image URL, markdown body, and tags
- **Live markdown preview** while editing article content
- **Edit existing articles** — title, author, body, image, and tags
- **Delete articles** with confirmation dialog

Articles created here appear on the public website's `/news` page. The previous unauthenticated create page on the public site has been removed in favor of this admin-only workflow.

## MCP Integrations

The Manager provides a full UI for managing MCP (Model Context Protocol) server connections at **Integrations** (`/integrations`). Users can connect external data sources and have their data automatically synced into DAISI Drive for RAG-powered AI search.

**Pages:**

- **MCP Home** (`McpHome.razor`, `/integrations`) — Two-column layout. Left sidebar lists registered MCP servers with status badges (Active, Paused, Error, Connecting). Right panel shows the selected server's detail view.
- **Add MCP Server** (`AddMcpServer.razor`, `/integrations/add`) — Registration form with fields for server name, URL, authentication type (None, Bearer Token, API Key), auth secret, target repository, and sync interval (5 min to 24 hours).
- **MCP Server Detail** (`McpServerDetail.razor`) — Component showing editable configuration, status info (last sync, server ID), discovered resources table with per-resource sync toggles, and action buttons (Sync Now, Delete, Save Changes).

**Navigation:** The "Integrations" item appears in the main navigation bar between Marketplace and Account.

## MCP Server (Credit Data Tools)

The Manager hosts an MCP (Model Context Protocol) HTTP endpoint at `/mcp` that exposes credit data tools. Any MCP-compatible client (Claude Desktop, VS Code Copilot, etc.) can connect using a DAISI client key as a Bearer token.

### Authentication

MCP clients authenticate by sending a DAISI client key as a Bearer token in the `Authorization` header. The middleware validates the key against the ORC and scopes all queries to the authenticated user's account.

### Available Tools

| Tool | Description | Parameters |
|------|-------------|-----------|
| `get_credit_balance` | Current balance, total earned/spent/purchased, and earn multipliers | none |
| `get_credit_transactions` | Paginated transaction history | `pageSize` (default 20, max 100), `pageIndex` (default 0) |
| `get_earnings_summary` | Earning transactions filtered and aggregated by type | `count` (default 50, max 200) |
| `get_spending_summary` | Spending transactions filtered and aggregated by type | `count` (default 50, max 200) |

### Client Configuration

Claude Desktop (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "daisi": {
      "url": "https://manager.daisinet.com/mcp",
      "headers": {
        "Authorization": "Bearer <your-daisi-client-key>"
      }
    }
  }
}
```

The client key is the same key generated when creating an App in the Manager.

### Architecture

- `McpBearerAuthMiddleware` — validates Bearer tokens on `/mcp` paths against the ORC
- `HybridClientKeyProvider` — replaces `CookieClientKeyProvider`; checks for Bearer-derived key first, falls back to cookies for Blazor pages
- `McpUserContext` — scoped service populated by the middleware with the authenticated user's identity
- `CreditTools` — `[McpServerToolType]` class containing the 4 credit data tools
- `DataConnectorTools` — `[McpServerToolType]` class containing 3 data connector management tools

### Data Connector Tools

In addition to credit tools, the MCP endpoint exposes tools for managing MCP data connectors:

| Tool | Description | Parameters |
|------|-------------|-----------|
| `list_data_connectors` | List all registered MCP data connectors for the account | none |
| `get_connector_status` | Get detailed status of a specific connector | `serverId` |
| `trigger_connector_sync` | Trigger an immediate sync for a connector | `serverId` |

### Data Connectors UI

The Manager provides a dedicated UI for managing MCP data connectors at **Data Connectors** (`/data-connectors`):

- **DataConnectorsHome.razor** (`/data-connectors`) — Lists registered MCP servers with status badges, last sync time, and resource counts. Actions: Add, Sync Now, Delete.
- **AddMcpServerDialog.razor** — Modal form for registering new MCP servers with name, URL, auth type, auth secret, and sync interval.
- **McpServerDetail.razor** (`/data-connectors/{ServerId}`) — Server info, Drive repository link, discovered resources table with enable/disable toggles, Sync Now button, and Delete with confirmation.

## Phase 3: Training UI

### Training Pages

A new section in the Manager for managing LoRA fine-tuning, accessible from the top navigation bar under **Training** (`/training`). The page has three tabs:

- **Datasets** (`DatasetsTab.razor`) — List all training datasets with name, base model, status, sample count, and size. Create new datasets from Drive file IDs or delete existing ones. Status badges indicate whether a dataset is generating, ready, or failed.
- **Training Jobs** (`TrainingJobsTab.razor`) — List all training jobs with status, progress bars, and cost estimates. Submit new jobs via a dialog with hyperparameter controls (epochs, batch size, learning rate, LoRA rank/alpha, QLoRA toggle, max sequence length). Cancel active jobs. Click a job row to view its detail page.
- **Adapters** (`AdaptersTab.razor`) — List all LoRA adapters with name, base model, status, file size, and source training job. Activate/deactivate toggle per adapter (only one active adapter per base model per account). Delete adapters.

### Job Detail Page

`JobDetail.razor` (`/training/jobs/{jobId}`) provides real-time training progress monitoring:

- **Progress bar** with epoch, step, loss, elapsed time, and estimated remaining time.
- **Details card** showing base model, dataset, cost, creation date, and result adapter link.
- **Hyperparameters card** showing all training configuration.
- **Auto-refresh** every 5 seconds for active jobs.
- **Cancel** button for active jobs.

### Dialogs

- **CreateDatasetDialog** — MudDialog form for creating datasets with name, description, base model, and comma-separated Drive file IDs.
- **SubmitJobDialog** — MudDialog form for submitting training jobs with dataset ID, base model, tunable hyperparameters, and cost estimation button.

### Navigation

A "Training" link with `fa-duotone fa-brain-circuit` icon has been added to the `MainLayout` top navigation between "Integrations" and "Account".

## One-Click Release Automation
The Manager provides a "Start Release" button on the Releases page that triggers the full DAISI release pipeline — SDK publish (if changed), ORC deploy, and Host release — with a single click. The Releases page is accessible from **Account > Releases** for account owners and from **Admin > Releases** for admin users.

See **[ReleaseSetup.md](ReleaseSetup.md)** for setup and verification steps, or jump directly to:
- **[GitPATSetup.md](GitPATSetup.md)** — Step-by-step GitHub PAT creation for `SDK_PAT`
- **[AzureADSetup.md](AzureADSetup.md)** — Azure AD app registration, federated credentials, and RBAC roles
