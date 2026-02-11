# Release Automation Setup — Manager Repo

The Manager is the user-facing application where the "Start Release" button lives. It calls the ORC's `TriggerRelease` gRPC endpoint, which dispatches the full release pipeline. The Manager itself does not need any release-specific secrets — it just needs to be deployed with the updated UI.

> **Naming conventions used in this guide:**
> Values like `daisinet`, `daisi-manager`, and `manager.daisinet.com` are examples from our deployment. Replace them with your own organization name, App Service name, and domain.

## Detailed Setup Guides

- **[GitPATSetup.md](GitPATSetup.md)** — Step-by-step instructions for creating `SDK_PAT` in the GitHub portal
- **[AzureADSetup.md](AzureADSetup.md)** — Step-by-step instructions for Azure AD app registration, federated credentials, and RBAC role assignments

## Prerequisites

- The ORC must be deployed with the `TriggerRelease` endpoint and `GitHub:ReleasePAT` configured (see [ORC repo ReleaseSetup.md](https://github.com/daisinet/daisi-orc-dotnet/blob/main/ReleaseSetup.md) — replace with your ORC repo URL if different)
- The Manager must be deployed after the ORC so the proto-generated client includes the new RPC

---

## Step 1: Configure GitHub Repository Secrets (for Manager deployment)

These are the existing secrets for deploying the Manager web app — no new secrets are needed for release automation.

Go to your Manager repo: **Settings > Secrets and variables > Actions > New repository secret**

| Secret Name | Description | Example |
|---|---|---|
| `AZURE_CLIENT_ID` | The Application (client) ID from your Azure AD app registration. Identifies the service principal for OIDC login. See [AzureADSetup.md](AzureADSetup.md). | `a1b2c3d4-e5f6-...` |
| `AZURE_TENANT_ID` | The Directory (tenant) ID from your Azure AD tenant. See [AzureADSetup.md](AzureADSetup.md). | `f7e8d9c0-b1a2-...` |
| `AZURE_SUBSCRIPTION_ID` | The ID of the Azure subscription containing your resources. See [AzureADSetup.md](AzureADSetup.md). | `1a2b3c4d-5e6f-...` |
| `AZURE_WEBAPP_NAME` | The name of the Azure App Service where the Manager is deployed. This is the name shown in the portal (same as the subdomain in `<name>.azurewebsites.net`). | `daisi-manager` |
| `SDK_PAT` | A GitHub PAT with **Contents: Read** access to the SDK and ORC repos. Used by `actions/checkout` to clone dependencies. See [GitPATSetup.md](GitPATSetup.md). | `github_pat_...` |

---

## Step 2: Deploy the Manager

The Manager deploys automatically on push to `main`, or manually via workflow dispatch:

1. Push your changes to `main`, or
2. Go to **Actions** > **Deploy Manager** > **Run workflow**

---

## Step 3: Verify the Release Button

1. Navigate to the Manager web app
2. Go to **Account > Releases**
3. Click **Start Release**
4. You should see a dialog with:
   - **Release Group** dropdown (beta, group1, group2, production)
   - **Release Notes** textarea
   - **Activate Immediately** toggle
   - **Start Release** button
5. Select `beta`, click **Start Release**
6. You should see a success toast: "Release {version} pipeline started. Build and deploy in progress."
7. Check the ORC repo > **Actions** tab to see the orchestration workflow running

---

## How the Release Flow Works

```
Manager UI                    ORC                          GitHub Actions
    |                          |                               |
    |-- TriggerRelease() ----->|                               |
    |   (group, notes,        |                               |
    |    activate)             |-- POST workflow_dispatch ---->|
    |                          |   (orchestrate-release.yml)   |
    |<-- version, success ----|                               |
    |                          |                               |-- Check SDK
    | (show toast)             |                               |-- Deploy ORC
    |                          |                               |-- Release Host
```

The Manager's role is simple: collect the release parameters from the user, call the ORC, and show a confirmation. All the heavy lifting happens in the GitHub Actions pipeline.

---

## First-Time Deployment Order

When deploying the release automation for the first time:

1. **Deploy SDK** — push proto changes to `main` so both ORC and Manager compile
2. **Deploy ORC** — it needs the new `TriggerRelease` endpoint and GitHub settings
3. **Deploy Manager** — it calls the ORC's new endpoint, so ORC must be ready first

After this initial manual deployment, all future releases are one-click from the Manager.

---

## Troubleshooting

**"Start Release" button shows an error**
- Check that the ORC is deployed with the latest proto (includes `TriggerRelease` RPC)
- Check that the ORC has `GitHub:ReleasePAT` and `GitHub:OrgName` configured

**Toast says success but no pipeline runs**
- The ORC successfully called the GitHub API, but the workflow might have failed to dispatch. Check:
  - The `RELEASE_PAT` has access to the ORC repo
  - The `orchestrate-release.yml` file exists on the `main` branch

**Dialog still shows old "Create" UI**
- The Manager hasn't been redeployed. Push to `main` or run the deploy workflow manually.
