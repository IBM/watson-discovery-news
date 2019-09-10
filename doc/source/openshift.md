# Run on RedHat OpenShift

This document shows how to run the `watson-discovery-news` application in a container running on RedHat OpenShift.

## Prerequisites

You will need a running OpenShift cluster, or OKD cluster. You can provision [OpenShift on the IBM Cloud](https://cloud.ibm.com/kubernetes/catalog/openshiftcluster).

## Steps

* In your OpenShift **Cluster Console**, open your project or click on **+ Create Project** to create one.
* Click over the to **Application Console**, then select your project.

![console-options](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-console-options.png)

* In the `Overview` tab, click on `Browse Catalog`

![Browse Catalog](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-browse-catalog.png)

* Choose the `Node.js` app container and click `Next`.

![Choose Node.js](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-choose-nodejs.png)

* Give your app a name and add `https://github.com/IBM/watson-discovery-news` for the github repo, then click `Create`.

![Add github repo](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-add-github-repo.png)

### Create your Watson Discovery service

To create your Watson Discovery service:

  1. Click **Create resource** on your IBM Cloud dashboard.

  2. Search the catalog for **Discovery**.

  3. Click **Discovery** to launch the create panel.

![create-service](https://raw.githubusercontent.com/IBM/pattern-utils/master/watson-discovery/discover-service-create.png)

From the panel, enter a unique name, a region and resource group, and a plan type (select the default **lite** plan). Click **Create** to create and enable your service.

### Configure Watson Discovery

The next step is to configure your Watson Discovery service.

  1. Find the Discovery service in your IBM Cloud Dashboard.
  2. Click on the service and then click **Launch tool**.

The Watson Discovery News data collection is already associated with your service. You'll use this collection as the data source for your app. To access the collection, you must find the `COLLECTION_ID` and `ENVIRONMENT_ID`. To find these values:

  1. Click on the collection from the Manage Data panel. In this case, it is named `Watson Discovery News`.
  2. Click on the drop-down icon located in the top right corner of the panel.

![get-collection-id](https://raw.githubusercontent.com/IBM/pattern-utils/master/watson-discovery/get-collection-id.png)

Typically, these values need to be added to the application .env file (as shown in the next step), but in the case of `Discovery News`, the values are always `news-en` (though it might vary based on language) and `system`, so you do not need to specify them.

### Create the config map

* You will need to export the key/value pairs from [env.sample](../../env.sample) as a config map.

* Locate the service credentials listed on the home page of your Discovery service.

![get-creds](https://raw.githubusercontent.com/IBM/pattern-utils/master/watson-discovery/get-creds.png)

Copy the `apikey` value from your Watson Discovery service credentials.

* Back in the OpenShift or OKD UI, click on the `Resources` tab and choose `Config Maps` and then `Create Config Map`.

* Add a key for `DISCOVERY_IAM_APIKEY` and past in the `apikey` value as `value`:

![add config map](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-generic-config-map.png)

* Click `Add item` and then add a key for `PORT` with the value `8080`.

* Go to the **Applications** tab, choose **Deployments**, and select your application. From your application panel, select the **Environment** tab. Under **Environment From** / **Config Map/Secret**, choose the config map you just created [1]. Save the config [2]. The app will re-deploy automatically, or click **Deploy** to re-deploy manually [3]. To see the variables in the Config Map that will be exported in the app environment, click **View Details**.

![add config map to app](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-add-config-map-to-app.png)

* Under `Applications` -> `Routes` you will see your app. Click on the `Hostname` to see your Watson Discovery News app in action.

[![return](https://raw.githubusercontent.com/IBM/pattern-utils/master/deploy-buttons/return.png)](https://github.com/IBM/watson-discovery-news#deployment-options)
