# Run locally

This document shows how to run the `watson-discovery-news` application on your local machine.

## Steps

1. [Clone the repo](#1-clone-the-repo)
1. [Create your Watson Discovery service](#2-create-your-watson-discovery-service)
1. [Configure Watson Discovery](#3-configure-watson-discovery)
1. [Add Watson Discovery credentials](#4-add-watson-discovery-credentials)
1. [Run the application](#5-run-the-application)

## 1. Clone the repo

Use the following command to clone the watson-discovery-news GitHub repository.

```bash
git clone https://github.com/ibm/watson-discovery-news
```

## 2. Create your Watson Discovery service

To create your Watson Discovery service:

  1. Click **Create resource** on your IBM Cloud dashboard.

  2. Search the catalog for **Discovery**.

  3. Click **Discovery** to launch the create panel.

![create-service](https://raw.githubusercontent.com/IBM/pattern-utils/master/watson-discovery/discover-service-create.png)

  4. From the panel, enter a unique name, a region and resource group, and a plan type (select the default **lite** plan). Click **Create** to create and enable your service.

## 3. Configure Watson Discovery

The next step is to configure your Watson Discovery service.

  1. Find the Discovery service in your IBM Cloud Dashboard.
  2. Click on the service and then click **Launch tool**.

The Watson Discovery News data collection is already associated with your service. You'll use this collection as the data source for your app. To access the collection, you must find the `COLLECTION_ID` and `ENVIRONMENT_ID`. To find these values:

  1. Click on the collection from the Manage Data panel. In this case, it is named `Watson Discovery News`.
  2. Click on the drop-down icon located in the top right corner of the panel.

![get-collection-id](https://raw.githubusercontent.com/IBM/pattern-utils/master/watson-discovery/get-collection-id.png)

Typically, these values need to be added to the application .env file (as shown in the next step), but in the case of `Discovery News`, the values are always `news-en` (though it might vary based on language) and `system`, so you do not need to specify them.

## 4. Add Watson Discovery credentials

Next, you'll need to add the Watson Discovery credentials to the .env file.

  1. From the home directory of your cloned local repo, create a .env file by copying it from the sample version.

<!--remove these HTML tags when series gets support for markdown code blocks -->
<div class="bx--snippet bx--snippet--multi bx--snippet-btn--expand--hide" data-code-snippet="">
  <div class="bx--snippet-container" aria-label="Code Snippet Text">
  <pre><code>
cp env.sample .env
  </pre></code>
  </div>
</div>

  2. Locate the service credentials listed on the home page of your Discovery service.

![get-creds](https://raw.githubusercontent.com/IBM/pattern-utils/master/watson-discovery/get-creds.png)

  3. Copy and paste the `apikey` and `URL` values from your Watson Discovery service credentials into the .env file:

```bash
# Watson Discovery
# Change the URL and uncomment if it is different from below:
# DISCOVERY_URL=https://gateway.watsonplatform.net/discovery/api
DISCOVERY_IAM_APIKEY=<add_discovery_iam_apikey>
```

### 5. Run the application

Finally, you'll run the application.

```bash
npm install
npm start
```

The application will be available in your browser at `http://localhost:3000`.

[![return](https://raw.githubusercontent.com/IBM/pattern-utils/master/deploy-buttons/return.png)](https://github.com/IBM/watson-discovery-news#deployment-options)
