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

## One-Click Release Automation
The Manager provides a "Start Release" button on the Releases page that triggers the full DAISI release pipeline — SDK publish (if changed), ORC deploy, and Host release — with a single click. The Releases page is accessible from **Account > Releases** for account owners and from **Admin > Releases** for admin users.

See **[ReleaseSetup.md](ReleaseSetup.md)** for setup and verification steps, or jump directly to:
- **[GitPATSetup.md](GitPATSetup.md)** — Step-by-step GitHub PAT creation for `SDK_PAT`
- **[AzureADSetup.md](AzureADSetup.md)** — Azure AD app registration, federated credentials, and RBAC roles
