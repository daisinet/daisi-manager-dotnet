# Azure AD / Entra ID Setup — daisi-manager-dotnet

The Manager's GitHub Actions workflow authenticates to Azure using **workload identity federation** (OIDC) to deploy the web app to Azure App Service. This guide walks through creating or reusing an Azure AD app registration, adding a federated credential for the Manager repo, assigning the correct RBAC role, and storing the IDs as GitHub secrets.

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
    |   (org: daisinet, repo: daisi-manager-dotnet, ref: main)
    |
    |-- issues Azure access token
    |
    v
Azure App Service (daisi-manager)
    |-- service principal has Contributor role
    |-- workflow deploys the published web app
```

---

## Step 1: Create or Reuse an App Registration

If you already created an app registration for the ORC (e.g. `daisi-github-deployments`), **you can reuse it** — just add another federated credential in Step 2. Each repo gets its own credential under the same app registration.

If you need a new one:

1. Sign in to the [Azure Portal](https://portal.azure.com)
2. Search for **"App registrations"** in the top search bar and select it
3. Click **+ New registration**
4. Fill in:
   - **Name**: `daisi-github-deployments` (or any descriptive name)
   - **Supported account types**: **Accounts in this organizational directory only**
   - **Redirect URI**: Leave blank
5. Click **Register**
6. On the **Overview** page, note:
   - **Application (client) ID** — this becomes `AZURE_CLIENT_ID`
   - **Directory (tenant) ID** — this becomes `AZURE_TENANT_ID`

> **Reusing the ORC's app registration?** The `AZURE_CLIENT_ID` and `AZURE_TENANT_ID` will be the same values you already have. You only need to add a new federated credential (Step 2) and a new RBAC role assignment (Step 4).

---

## Step 2: Add a Federated Credential for daisi-manager-dotnet

This tells Azure AD to trust tokens from GitHub Actions when they come from the Manager repo.

1. In the Azure Portal, go to **App registrations** > select your app
2. In the left sidebar, click **Certificates & secrets**
3. Click the **Federated credentials** tab
4. Click **+ Add credential**
5. Select **Federated credential scenario**: **GitHub Actions deploying Azure resources**
6. Fill in:
   - **Organization**: `daisinet`
   - **Repository**: `daisi-manager-dotnet`
   - **Entity type**: **Branch**
   - **GitHub branch name**: `main`
   - **Name**: `daisi-manager-dotnet-main`
   - **Description**: `Deploy Manager from main branch`
7. Click **Add**

### Why does the Manager need its own federated credential?

Each federated credential is scoped to a specific (org, repo, branch/tag/environment). Even if you reuse the same app registration as the ORC, the Manager repo needs its own credential because the OIDC token GitHub sends includes the repo name in the subject claim.

### If you also trigger manually via workflow_dispatch

The `deploy-manager.yml` workflow triggers both on `push` to `main` and `workflow_dispatch`. Both run on the `main` branch, so a single branch-type credential covers both triggers.

---

## Step 3: Find Your Subscription ID

If you already have this from the ORC setup, use the same value.

1. In the Azure Portal, search for **"Subscriptions"**
2. Select the subscription containing your Manager App Service
3. Copy the **Subscription ID** from the Overview page — this becomes `AZURE_SUBSCRIPTION_ID`

---

## Step 4: Assign Contributor Role on the Manager App Service

The service principal needs permission to deploy code to the Manager's App Service.

1. In the Azure Portal, go to **App Services** > select your Manager app (e.g. `daisi-manager`)
2. In the left sidebar, click **Access control (IAM)**
3. Click **+ Add** > **Add role assignment**
4. **Role** tab:
   - Search for **Contributor**
   - Select **Contributor** and click **Next**
5. **Members** tab:
   - **Assign access to**: **User, group, or service principal**
   - Click **+ Select members**
   - Search for your app registration name (e.g. `daisi-github-deployments`)
   - Select it and click **Select**
6. Click **Review + assign** > **Review + assign**

> **Already assigned Contributor at the resource group level for the ORC?** If the Manager App Service is in the same resource group, the service principal may already have access. Check the **Role assignments** tab under the App Service's IAM to verify.

### What Contributor grants

The `deploy-manager.yml` workflow performs two actions that require Contributor:
- **`azure/webapps-deploy@v3`**: Deploys the published app package to the App Service
- If you ever add `az webapp config appsettings set` commands, Contributor covers those too

---

## Step 5: Store Azure IDs as GitHub Secrets

1. Go to [github.com/daisinet/daisi-manager-dotnet](https://github.com/daisinet/daisi-manager-dotnet)
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Add each secret by clicking **New repository secret**:

| Secret Name | Value | Where to find it |
|---|---|---|
| `AZURE_CLIENT_ID` | Application (client) ID | Azure Portal > App registrations > your app > Overview |
| `AZURE_TENANT_ID` | Directory (tenant) ID | Azure Portal > App registrations > your app > Overview |
| `AZURE_SUBSCRIPTION_ID` | Subscription ID | Azure Portal > Subscriptions > your sub > Overview |
| `AZURE_WEBAPP_NAME` | Manager App Service name (e.g. `daisi-manager`) | Azure Portal > App Services > your Manager app > Overview > Name |

> **Note**: `AZURE_WEBAPP_NAME` is the **name** of the App Service (the part before `.azurewebsites.net`), not a GUID.

> **Reusing the ORC's app registration?** `AZURE_CLIENT_ID` and `AZURE_TENANT_ID` will be the same values as in the ORC repo. `AZURE_SUBSCRIPTION_ID` is the same if both apps are in the same subscription. Only `AZURE_WEBAPP_NAME` is different.

---

## Step 6: Verify the Setup

### Test the deployment

1. Go to the **daisi-manager-dotnet** repo > **Actions** tab
2. Select the **Deploy Manager** workflow
3. Click **Run workflow** (on the `main` branch)
4. Watch the workflow — specifically the **Azure Login** and **Deploy to Azure App Service** steps
5. Both should succeed

### Verify in the Azure Portal

1. Go to **App Services** > your Manager app > **Overview**
2. Check the **Last deployment** timestamp — it should match your workflow run
3. Open the app URL (e.g. `https://manager.daisinet.com`) and verify it loads

---

## Sharing an App Registration Across Repos

If you use one app registration for all DAISI repos, here's what it looks like:

### Federated credentials (under Certificates & secrets)

| Name | Repository | Entity | Branch/Tag |
|------|-----------|--------|------------|
| `daisi-orc-dotnet-main` | `daisi-orc-dotnet` | Branch | `main` |
| `daisi-manager-dotnet-main` | `daisi-manager-dotnet` | Branch | `main` |
| `daisi-hosts-dotnet-main` | `daisi-hosts-dotnet` | Branch | `main` |
| `daisi-hosts-dotnet-beta` | `daisi-hosts-dotnet` | Tag | `beta-*` |

### RBAC role assignments

| Resource | Role | Assigned to |
|----------|------|-------------|
| ORC App Service (`daisi-orc`) | Contributor | `daisi-github-deployments` |
| Manager App Service (`daisi-manager`) | Contributor | `daisi-github-deployments` |
| Storage Account (`daisi`) | Storage Blob Data Contributor | `daisi-github-deployments` |
| CosmosDB Account | Cosmos DB Built-in Data Contributor | `daisi-github-deployments` |

### GitHub secrets per repo

| Secret | ORC | Manager | Hosts |
|--------|-----|---------|-------|
| `AZURE_CLIENT_ID` | Same value | Same value | Same value |
| `AZURE_TENANT_ID` | Same value | Same value | Same value |
| `AZURE_SUBSCRIPTION_ID` | Same value | Same value | Same value |
| `AZURE_ORC_WEBAPP_NAME` | `daisi-orc` | — | — |
| `AZURE_WEBAPP_NAME` | — | `daisi-manager` | — |

---

## Troubleshooting

### "AADSTS700024: Client assertion is not within its valid time range"
- The workflow ran on a ref that doesn't match any federated credential. Verify the credential's entity type (Branch) and value (`main`).

### "AADSTS70021: No matching federated identity record found"
- Azure couldn't find a federated credential matching the token. Check:
  - Organization is `daisinet` (not your personal account)
  - Repository is `daisi-manager-dotnet` (exact match, case-sensitive)
  - Entity type is Branch, value is `main`

### "AuthorizationFailed: does not have authorization to perform action 'Microsoft.Web/sites/publish'"
- The service principal doesn't have Contributor on the Manager App Service. Follow Step 4 to add the role assignment.

### "The subscription 'xxx' could not be found"
- `AZURE_SUBSCRIPTION_ID` is incorrect. Double-check the value in the Azure Portal.

### "WebApp 'daisi-manager' not found in subscription"
- `AZURE_WEBAPP_NAME` doesn't match. Verify the exact name in App Services. The name is case-sensitive.

---

## Quick Reference

| GitHub Secret | Azure Source | Notes |
|---|---|---|
| `AZURE_CLIENT_ID` | App registrations > Overview > Application (client) ID | Same if sharing app registration |
| `AZURE_TENANT_ID` | App registrations > Overview > Directory (tenant) ID | Same if sharing app registration |
| `AZURE_SUBSCRIPTION_ID` | Subscriptions > Overview > Subscription ID | Same if in same subscription |
| `AZURE_WEBAPP_NAME` | App Services > Overview > Name | Unique per app |
