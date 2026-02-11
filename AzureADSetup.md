# Azure AD / Entra ID Setup — Manager Repo

The Manager's GitHub Actions workflow authenticates to Azure using **workload identity federation** (OIDC) to deploy the web app to Azure App Service. This guide walks through creating or reusing an Azure AD app registration, adding a federated credential for the Manager repo, assigning the correct RBAC role, and storing the IDs as GitHub secrets.

> **Naming conventions used in this guide:**
> Throughout this document, placeholder values are shown in angle brackets. Replace them with your actual values.
>
> | Placeholder | Description | Example |
> |---|---|---|
> | `<your-org>` | Your GitHub organization or account name | `daisinet` |
> | `<your-manager-repo>` | The GitHub repo containing the Manager (this repo) | `daisi-manager-dotnet` |
> | `<your-orc-repo>` | The GitHub repo containing the ORC | `daisi-orc-dotnet` |
> | `<your-hosts-repo>` | The GitHub repo containing the Hosts | `daisi-hosts-dotnet` |
> | `<your-manager-app-service>` | The Azure App Service name where the Manager is deployed | `daisi-manager` |
> | `<your-orc-app-service>` | The Azure App Service name where the ORC is deployed | `daisi-orc` |
> | `<your-app-registration>` | The name of your Azure AD app registration | `daisi-github-deployments` |
> | `<your-storage-account>` | The Azure Storage Account for blob storage | `daisi` |

---

## Overview

```
GitHub Actions (deploy-manager.yml)
    |
    |-- presents OIDC token (signed by GitHub)
    |
    v
Azure AD / Entra ID
    |-- verifies token matches federated credential
    |   (org: <your-org>, repo: <your-manager-repo>, ref: main)
    |
    |-- issues Azure access token
    |
    v
Azure App Service (<your-manager-app-service>)
    |-- service principal has Contributor role
    |-- workflow deploys the published web app
```

---

## Step 1: Create or Reuse an App Registration

An **app registration** is an identity in Azure AD that your GitHub Actions workflows authenticate as. If you already created one for the ORC setup, **you can reuse it** — just add another federated credential in Step 2. Each repo gets its own credential under the same app registration.

If you need a new one:

1. Sign in to the [Azure Portal](https://portal.azure.com)
2. Search for **"App registrations"** in the top search bar and select it
3. Click **+ New registration**
4. Fill in:
   - **Name**: A descriptive name (e.g. `<your-app-registration>`)
   - **Supported account types**: **Accounts in this organizational directory only**
   - **Redirect URI**: Leave blank
5. Click **Register**
6. On the **Overview** page, note:
   - **Application (client) ID** — a GUID that becomes the `AZURE_CLIENT_ID` secret
   - **Directory (tenant) ID** — a GUID that becomes the `AZURE_TENANT_ID` secret

> **Reusing the ORC's app registration?** The `AZURE_CLIENT_ID` and `AZURE_TENANT_ID` will be the same values you already have. You only need to add a new federated credential (Step 2) and a new RBAC role assignment (Step 4).

---

## Step 2: Add a Federated Credential for the Manager Repo

A **federated credential** tells Azure AD to trust OIDC tokens from GitHub Actions when they come from a specific repo and branch.

1. In the Azure Portal, go to **App registrations** > select your app
2. In the left sidebar, click **Certificates & secrets**
3. Click the **Federated credentials** tab
4. Click **+ Add credential**
5. Select **Federated credential scenario**: **GitHub Actions deploying Azure resources**
6. Fill in:
   - **Organization**: `<your-org>` — your GitHub org name (e.g. `daisinet`)
   - **Repository**: `<your-manager-repo>` — repo name without the org prefix (e.g. `daisi-manager-dotnet`)
   - **Entity type**: **Branch**
   - **GitHub branch name**: `main`
   - **Name**: A label (e.g. `<your-manager-repo>-main`)
   - **Description**: Optional (e.g. `Deploy Manager from main branch`)
7. Click **Add**

### Why does the Manager need its own federated credential?

Each federated credential is scoped to a specific (org, repo, branch/tag/environment). Even if you reuse the same app registration as the ORC, the Manager repo needs its own credential because the OIDC token GitHub sends includes the repo name in the subject claim.

### If you also trigger manually via workflow_dispatch

The `deploy-manager.yml` workflow triggers both on `push` to `main` and `workflow_dispatch`. Both run on the `main` branch, so a single branch-type credential covers both triggers.

---

## Step 3: Find Your Subscription ID

The **subscription ID** identifies which Azure subscription your resources are in. If you already have this from the ORC setup, use the same value.

1. In the Azure Portal, search for **"Subscriptions"**
2. Select the subscription containing your Manager App Service
3. Copy the **Subscription ID** from the Overview page — this becomes `AZURE_SUBSCRIPTION_ID`

---

## Step 4: Assign Contributor Role on the Manager App Service

The service principal needs permission to deploy code to the Manager's App Service. The **Contributor** role grants this.

1. In the Azure Portal, go to **App Services** > select your Manager app (`<your-manager-app-service>`)
2. In the left sidebar, click **Access control (IAM)**
3. Click **+ Add** > **Add role assignment**
4. **Role** tab:
   - Search for **Contributor**
   - Select **Contributor** and click **Next**
5. **Members** tab:
   - **Assign access to**: **User, group, or service principal**
   - Click **+ Select members**
   - Search for your app registration name (e.g. `<your-app-registration>`)
   - Select it and click **Select**
6. Click **Review + assign** > **Review + assign**

> **Already assigned Contributor at the resource group level for the ORC?** If the Manager App Service is in the same resource group, the service principal may already have access. Check the **Role assignments** tab under the App Service's IAM to verify.

---

## Step 5: Store Azure IDs as GitHub Secrets

1. Go to your Manager repo on GitHub (`<your-org>/<your-manager-repo>`)
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Add each secret by clicking **New repository secret**:

| Secret Name | What it is | Where to find it | Example value |
|---|---|---|---|
| `AZURE_CLIENT_ID` | The app registration's unique identifier | Azure Portal > App registrations > your app > Overview > **Application (client) ID** | `a1b2c3d4-e5f6-...` |
| `AZURE_TENANT_ID` | Your Azure AD directory's unique identifier | Azure Portal > App registrations > your app > Overview > **Directory (tenant) ID** | `f7e8d9c0-b1a2-...` |
| `AZURE_SUBSCRIPTION_ID` | The subscription containing your Azure resources | Azure Portal > Subscriptions > your sub > Overview > **Subscription ID** | `1a2b3c4d-5e6f-...` |
| `AZURE_WEBAPP_NAME` | The name of the Manager's Azure App Service | Azure Portal > App Services > your Manager app > Overview > **Name** (same as subdomain in `<name>.azurewebsites.net`) | `daisi-manager` |

> **Reusing the ORC's app registration?** `AZURE_CLIENT_ID` and `AZURE_TENANT_ID` will be the same values as in the ORC repo. `AZURE_SUBSCRIPTION_ID` is the same if both apps are in the same subscription. Only `AZURE_WEBAPP_NAME` differs between repos.

---

## Step 6: Verify the Setup

### Test the deployment

1. Go to your Manager repo > **Actions** tab
2. Select the **Deploy Manager** workflow
3. Click **Run workflow** (on the `main` branch)
4. Watch the workflow — specifically the **Azure Login** and **Deploy to Azure App Service** steps
5. Both should succeed

### Verify in the Azure Portal

1. Go to **App Services** > your Manager app > **Overview**
2. Check the **Last deployment** timestamp — it should match your workflow run
3. Open the app URL and verify it loads

---

## Sharing an App Registration Across Repos

If you use one app registration for all deployments, here's what the full setup looks like:

### Federated credentials (under Certificates & secrets)

| Name | Repository | Entity | Branch/Tag |
|------|-----------|--------|------------|
| `<your-orc-repo>-main` | `<your-orc-repo>` | Branch | `main` |
| `<your-manager-repo>-main` | `<your-manager-repo>` | Branch | `main` |
| `<your-hosts-repo>-main` | `<your-hosts-repo>` | Branch | `main` |
| `<your-hosts-repo>-beta` | `<your-hosts-repo>` | Tag | `beta-*` |

### RBAC role assignments

| Resource | Role | Assigned to |
|----------|------|-------------|
| ORC App Service | Contributor | `<your-app-registration>` |
| Manager App Service | Contributor | `<your-app-registration>` |
| Storage Account | Storage Blob Data Contributor | `<your-app-registration>` |
| CosmosDB Account | Cosmos DB Built-in Data Contributor | `<your-app-registration>` |

### GitHub secrets per repo

| Secret | ORC | Manager | Hosts |
|--------|-----|---------|-------|
| `AZURE_CLIENT_ID` | Same value | Same value | Same value |
| `AZURE_TENANT_ID` | Same value | Same value | Same value |
| `AZURE_SUBSCRIPTION_ID` | Same value | Same value | Same value |
| `AZURE_ORC_WEBAPP_NAME` | Your ORC app name | -- | -- |
| `AZURE_WEBAPP_NAME` | -- | Your Manager app name | -- |

---

## Troubleshooting

### "AADSTS700024: Client assertion is not within its valid time range"
- The workflow ran on a ref that doesn't match any federated credential. Verify the credential's entity type (Branch) and value (`main`).

### "AADSTS70021: No matching federated identity record found"
- Azure couldn't find a federated credential matching the token. Check:
  - Organization matches your GitHub org
  - Repository matches your Manager repo name (exact match, case-sensitive)
  - Entity type is Branch, value is `main`

### "AuthorizationFailed: does not have authorization to perform action 'Microsoft.Web/sites/publish'"
- The service principal doesn't have Contributor on the Manager App Service. Follow Step 4 to add the role assignment.

### "The subscription 'xxx' could not be found"
- `AZURE_SUBSCRIPTION_ID` is incorrect. Double-check the value in the Azure Portal.

### "WebApp '...' not found in subscription"
- `AZURE_WEBAPP_NAME` doesn't match. Verify the exact name in App Services. The name is case-sensitive.

---

## Quick Reference

| GitHub Secret | What it is | Azure Source | Notes |
|---|---|---|---|
| `AZURE_CLIENT_ID` | App registration identifier | App registrations > Overview > Application (client) ID | Same if sharing app registration across repos |
| `AZURE_TENANT_ID` | Azure AD directory identifier | App registrations > Overview > Directory (tenant) ID | Same if sharing app registration |
| `AZURE_SUBSCRIPTION_ID` | Subscription identifier | Subscriptions > Overview > Subscription ID | Same if all resources in one subscription |
| `AZURE_WEBAPP_NAME` | App Service name | App Services > Overview > Name | Unique per application |
