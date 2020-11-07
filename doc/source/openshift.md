# Run on Red Hat OpenShift

This document shows how to run the `watson-discovery-news` application in a container running on Red Hat OpenShift.

## Prerequisites

You will need a running OpenShift cluster, or OKD cluster. You can provision [OpenShift on the IBM Cloud](https://cloud.ibm.com/kubernetes/catalog/openshiftcluster).

## Steps

1. [Create your Watson Discovery service](#1-create-your-watson-discovery-service)
1. [Create an OpenShift project](#2-create-an-openshift-project)
1. [Create the config map](#3-create-the-config-map)
1. [Run the application](#4-run-the-application)

## 1. Create your Watson Discovery service

* [Click here](https://cloud.ibm.com/catalog/services/discovery) to go the Watson Discovery create resource page.
* Review the settings. The defaults and a **Free** plan should work.
* Click `Create`.
* Copy/paste the `API Key` and `URL` or keep the browser tab open. You'll need these later.

  ![get-creds](https://raw.githubusercontent.com/IBM/pattern-utils/master/watson-discovery/get-creds.png)

## 2. Create an OpenShift project

* Using the OpenShift web console, select the `Application Console` view.

  ![console-options](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-app-console-option.png)

* Use the `+Create Project` button to create a new project, then click on your project to open it.

* In the `Overview` tab, click on `Browse Catalog`.

  ![Browse Catalog](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-browse-catalog.png)

* Choose the `Node.js` app container and click `Next`.

  ![Choose Node.js](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-choose-nodejs.png)

* Give your app a name and add `https://github.com/IBM/watson-discovery-news` for the github repo, then click `Create`.

  ![Add github repo](https://raw.githubusercontent.com/IBM/pattern-utils/master/openshift/openshift-add-github-repo.png)

## 3. Create the config map

  ![add config map](https://raw.githubusercontent.com/kdeif/watson-discovery-news/master/doc/source/images/edit-configmap.png)

Create a new Config Map under Workloads then under Config Maps.

* Provide a `Name` for the config map.
* Add a key named `DISCOVERY_IAM_APIKEY` and paste in the API Key from step 1.
* Add a key named `DISCOVERY_URL` and paste in the URL from step 1.
* Add a key named `PORT`, enter 8080.
* Click `Save`.

Go to the `Applications` tab, choose `Deployments` to view the status of your application.

## 3. Reference the config map in the Deployment

Click on the Edit Deployment button.
![Go to Edit Deployment](https://raw.githubusercontent.com/kdeif/watson-discovery-news/master/doc/source/images/edit-deployment.png)

Then Add the following to the deployment yaml:

          envFrom: 
            - configMapRef:
              name: news-cm
              
![Edit Deployment yaml](https://raw.githubusercontent.com/kdeif/watson-discovery-news/master/doc/source/images/edit-deployment-yaml.png)

## 5. Run the application

Under `Applications` -> `Routes` you will see your app. Click on the `Hostname` to see your Watson Discovery News app in action.

* From the OpenShift or OKD UI, under `Applications` -> `Routes` you will see your app. Click on the `Hostname`to see your Watson Discovery News app in action.
* Save this URL.

[![return](https://raw.githubusercontent.com/IBM/pattern-utils/master/deploy-buttons/return.png)](https://github.com/IBM/watson-discovery-news#deployment-options)
