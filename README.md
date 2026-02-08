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
