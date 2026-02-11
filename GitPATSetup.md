# GitHub Personal Access Token Setup — Manager Repo

The Manager repo requires one GitHub PAT (`SDK_PAT`) that allows its CI/CD workflow to check out two private dependency repos during the build.

> **Naming conventions used in this guide:**
> Throughout this document, placeholder values are shown in angle brackets. Replace them with your actual values.
>
> | Placeholder | Description | Example |
> |---|---|---|
> | `<your-org>` | Your GitHub organization or account name | `daisinet` |
> | `<your-sdk-repo>` | The repo containing the SDK and proto definitions | `daisi-sdk-dotnet` |
> | `<your-orc-repo>` | The repo containing the ORC | `daisi-orc-dotnet` |
> | `<your-manager-repo>` | The repo containing the Manager (this repo) | `daisi-manager-dotnet` |
> | `<your-hosts-repo>` | The repo containing the Host application | `daisi-hosts-dotnet` |

---

## PAT: `SDK_PAT` — Dependency Checkout

The Manager's `deploy-manager.yml` workflow checks out three repos to compile:
- This repo (checked out automatically)
- The SDK repo (SDK libraries and proto definitions)
- The ORC repo (core library — the Manager project references it for shared data models)

The latter two are private repos, so the workflow needs a token to access them.

### Step 1: Create the token

1. Sign in to GitHub as a user who has **read access** to both the SDK and ORC repos
2. Click your **profile avatar** (top-right) > **Settings**
3. In the left sidebar, scroll down and click **Developer settings**
4. Click **Personal access tokens** > **Fine-grained tokens**
5. Click **Generate new token**
6. Fill in the form:
   - **Token name**: A descriptive name (e.g. `manager-dependency-checkout`)
   - **Expiration**: 90 days (or your org's maximum; set a calendar reminder to rotate)
   - **Resource owner**: Select your organization (`<your-org>`)
   - **Repository access**: Click **Only select repositories**, then select both:
     - `<your-org>/<your-sdk-repo>` — the SDK/proto definitions repo
     - `<your-org>/<your-orc-repo>` — the ORC core library repo
   - **Permissions** > **Repository permissions**:
     - **Contents**: **Read-only** — allows `actions/checkout` to clone the repos (this is the only permission needed)
     - Leave all other permissions at "No access"
7. Click **Generate token**
8. **Copy the token immediately** — you won't be able to see it again

### Step 2: Add as a GitHub Actions secret

1. Go to your Manager repo on GitHub (`<your-org>/<your-manager-repo>`)
2. Click **Settings** (the repo settings tab, not your profile)
3. In the left sidebar, click **Secrets and variables** > **Actions**
4. Click **New repository secret**
5. Fill in:
   - **Name**: `SDK_PAT`
   - **Secret**: Paste the token from Step 1
6. Click **Add secret**

### What uses this token

| Workflow | Steps | Purpose |
|----------|-------|---------|
| `deploy-manager.yml` | Checkout SDK repo | Manager references SDK libraries (`Daisi.SDK`, `Daisi.SDK.Web`, `Daisi.SDK.Razor`) |
| `deploy-manager.yml` | Checkout ORC repo | Manager references ORC core library for shared data models |

Both checkout steps use the same `SDK_PAT` token:
```yaml
- uses: actions/checkout@v4
  with:
    repository: <your-org>/<your-sdk-repo>
    token: ${{ secrets.SDK_PAT }}

- uses: actions/checkout@v4
  with:
    repository: <your-org>/<your-orc-repo>
    token: ${{ secrets.SDK_PAT }}
```

---

## Can I reuse the same PAT across repos?

Yes. If you create a single fine-grained token with read access to both the SDK and ORC repos, you can use it as the `SDK_PAT` in multiple repos (Manager, ORC, Hosts). Just add it as a secret in each repo that needs it.

To centralize, you can also use **organization-level secrets**:
1. Go to your org's settings: `github.com/organizations/<your-org>/settings/secrets/actions`
2. Click **New organization secret**
3. Name: `SDK_PAT`, paste the value
4. Under **Repository access**, select the repos that should have access (e.g. your ORC, Hosts, and Manager repos)
5. Click **Add secret**

This way you only maintain one token instead of three separate secrets.

---

## Token Rotation

The token expires based on the lifetime you set. To rotate:

1. Generate a new token following Step 1 above
2. Go to each repo that uses it (or the org secret) and update the `SDK_PAT` value
3. The old token is automatically revoked on expiration, or you can revoke it immediately at **Settings > Developer settings > Personal access tokens**

> **Tip**: If you use an org-level secret, you only need to update it in one place.

---

## Troubleshooting

**"HttpError: Bad credentials" during checkout**
- The token has expired or been revoked. Generate a new one and update the secret.

**"HttpError: Repository not found" during checkout**
- The token doesn't have access to the target repo. Edit the token at **Settings > Developer settings > Personal access tokens** and verify the repository list includes both the SDK and ORC repos.

**"HttpError: Resource not accessible by personal access token"**
- The token's permissions are insufficient. Verify it has **Contents: Read-only** for the target repos.

---

## Quick Reference

| Secret | Where it's stored | Repos it accesses | Permissions |
|--------|-------------------|-------------------|-------------|
| `SDK_PAT` | GitHub Actions secret (repo or org level) | SDK repo, ORC repo | Contents: Read-only |
