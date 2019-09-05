# Run on IBM Cloud with Cloud Foundry

This document shows how to run the `watson-discovery-news` application using Cloud Foundry on IBM Cloud.

> **NOTE**: This app cannot be deployed to IBM Cloud with Cloud Foundry **if** you are using a free trial IBM Cloud account. This type of account is classified as a `Lite` accoount, and has a limit of 256 MB of instantaneous runtime memory available for your Cloud Foundry apps. The `watson-discovery-news` app requires 512 MB.
<br>
<br>
If you're using a Lite account, you can get more memory by upgrading to a billable account (limit is 2 GB). From the IBM Cloud console, go to `Manage` > `Account`, and select `Account settings`. For more information about Lite account features, see [Lite account](https://cloud.ibm.com/docs/account?topic=account-accounts#liteaccount).

## Steps

<p align="center">
    <a href="https://cloud.ibm.com/devops/setup/deploy?repository=https://github.com/IBM/watson-discovery-news">
    <img src="https://cloud.ibm.com/devops/setup/deploy/button_x2.png" alt="Deploy to IBM Cloud">
    </a>
</p>

1. Click the `Deploy to IBM Cloud` button and hit `Create` on the next prompt. This will automatically create the services and application for you. Create an IBM Cloud API key if required.

![deploy](images/deploy.png)

2. From the Toolchains view, click on the Delivery Pipeline to watch while the app is deployed. Here you'll be able to see logs about the deployment.

![toolchain-pipeline](images/toolchain-pipeline.png)

3. To see the app and services that were created use the [IBM Cloud dashboard](https://cloud.ibm.com). The app is named `watson-discovery-news` with a unique suffix. The following services are created:

    * discovery-news-service

[![return](https://raw.githubusercontent.com/IBM/pattern-utils/master/deploy-buttons/return.png)](https://github.com/IBM/watson-discovery-news#deployment-options)
