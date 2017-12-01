[![Build Status](https://travis-ci.org/IBM/watson-discovery-news.svg?branch=master)](https://travis-ci.org/IBM/watson-discovery-news)
![IBM Cloud Deployments](https://deployment-tracker.mybluemix.net/stats/c58bea8bac2a6faa8d98e3d6c6cb9320/badge.svg)

# Query Watson Discovery News using the Watson Discovery Service

In this Code Pattern, we will build a Node.js web application that will use the Watson Discovery Service to access Watson Discovery News.

Watson Discovery News is a default data collection that is associated with the Watson Discovery Service. It is a dataset of primarily English language news sources that is updated continuously, with approximately 300,000 new articles and blogs added daily.

This Code Pattern will demonstrate two use cases for accessing Watson Discovery News:

* **Trending Topics in the News** - Identify popular topics over the past 24 hours. Topics can be general, or for a specific industry or category.

* **Search** - Query for the most relevant new articles about a specific topic or subject. Results will include enrichment data, such as article summary text and sentiment analysis.

Optionally included will be examples of how to:

* Build a **RSS News Feed** generator to push Trending Topic news to your favorite RSS reader.

* Build a **SlackBot** to access the Search feature from Slack.

![](doc/source/images/architecture.png)

## Flow
1. The user interacts with the Watson Discovery News Server via the app UI.
2. User input is processed and routed to the Watson Discovery News Server.
3. The Watson Discovery News Server sends user requests to the Watson Discovery Service.
4. The Watson Discovery Service queries the Watson News Collection.
5. The Watson Discovery Service sends news articles to the RSS Reader.
6. The Watson Discovery Service responds to Slack search requests.

# Included components

* [Watson Discovery](https://www.ibm.com/watson/developercloud/discovery.html): A cognitive search and content analytics engine for applications to identify patterns, trends, and actionable insights.

# Featured technologies

* [Node.js](https://nodejs.org/en/) - An asynchronous event driven JavaScript runtime, designed to build scalable applications
* [React](https://facebook.github.io/react/) - Javascript library for building User Interfaces
* [Express](https://expressjs.com) - A popular and minimalistic web framework for creating API and Web server
* [Yarn](https://yarnpkg.com) - Fast, reliable and secure dependency manager for node.js
* [RSS](https://en.wikipedia.org/wiki/RSS) - RSS (Rich Site Summary) is a format for delivering regularly changing web content in our case it will be trending topics
* [Slack](https://slack.com) - Slack is a cloud-based set of team collaboration tools and services with chat bot integration
* [Botkit](https://www.botkit.ai) - Framework for creating and managing chat bots

# Watch the Video

[![](http://img.youtube.com/vi/EZGgvci9nC0/0.jpg)](https://youtu.be/EZGgvci9nC0)

# Steps

Use the ``Deploy to IBM Cloud`` button **OR** create the services and run locally.

## Deploy to IBM Cloud
[![Deploy to IBM Cloud](https://deployment-tracker.mybluemix.net/stats/c58bea8bac2a6faa8d98e3d6c6cb9320/button.svg)](https://bluemix.net/deploy?repository=https://github.com/IBM/watson-discovery-news.git)

1. Press the above ``Deploy to IBM Cloud`` button and then click on ``Deploy``.

2. In Toolchains, click on Delivery Pipeline to watch while the app is deployed. Once deployed, the app can be viewed by clicking 'View app'.

<p align="center">
  <img width="600" src="doc/source/images/toolchain-pipeline.png">
</p>

3. To see the app and services created and configured for this Code Pattern, use the IBM Cloud dashboard. The app is named `watson-discovery-news` with a unique suffix. The following services are created:
    * discovery-news-service

## Run locally
> NOTE: These steps are only needed when running locally instead of using the ``Deploy to IBM Cloud`` button.

1. [Clone the repo](#1-clone-the-repo)
2. [Create Watson Services with IBM Cloud](#2-create-watson-services-with-ibm-cloud)
3. [Configure Watson Discovery](#3-configure-watson-discovery)
4. [Configure Slack](#4-configure-slack)
5. [Run the application](#5-run-the-application)

## 1. Clone the repo

Clone the `watson-discovery-news` locally. In a terminal, run:
```
$ git clone https://github.com/ibm/watson-discovery-news
```

## 2. Create Watson Services with IBM Cloud

Create the following service:

  * [**Watson Discovery**](https://console.ng.bluemix.net/catalog/services/discovery)

## 3. Configure Watson Discovery

Fill in name you want to give to your service and click *Create*.

<p align="center">
  <img width="600" src="doc/source/images/discovery-1.png">
</p>

After the service is created, click on *Service credentials* and then click on *View Credentials*. Save these credentials as they will be needed when configuring the app.

<p align="center">
  <img width="600" src="doc/source/images/discovery-2.png">
</p>

## 4. Configure Slack

To integrate a new Slack Bot into your existing Slack team, navigate to https://my.slack.com/services/new/bot. Enter a username for the bot and click **Add bot integration**.

<p align="center">
  <img width="600" src="doc/source/images/slack-1.png">
</p>

Once created, save the **API Token** that is generated.

<p align="center">
  <img width="600" src="doc/source/images/slack-2.png">
</p>

## 5. Run the application

### If you used the Deploy to IBM Cloud button...

If you used ``Deploy to IBM Cloud``, most of the setup is automatic, but not quite all of it. We have to update a few environment variables.

In the IBM Cloud dashboard find the App that was created. Click on ``Runtime`` on the menu and navigate to the ``Environment variables`` tab.

![](doc/source/images/env_vars.png)

Update the following environment variable:

  * Set ``SLACK_BOT_TOKEN`` to the token you saved previously

Save the new value and restart the application, watch the logs for errors.

### If you decided to run the app locally...

1. Install [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com)
2. Install all of the dependencies by running `yarn`. This will install of the node modules specified in [`package.json`](package.json)
```
$ yarn
```
3. Run `yarn bootstrap` to copy the `.env.sample` to `.env`
```
$ yarn bootstrap
```
4. Edit the `.env` file and enter the Watson Discovery credentials and Slack Bot Token saved in previous steps
5. Start the app by running `yarn start`. If you are developing and making changes to the app and would like the server to restart every time then run `yarn start:watch`
```
$ yarn start
```
6. Open a browser and go to `http://localhost:{PORT}`, where PORT is the value specified in `.env` (default is 3000)

# Sample output

### Trending Topics RSS Feed  ![](doc/source/images/rss_feed.png)

On the **Trending News Panel**, click the RSS Feed button to launch a new tab in your browser. Cut and paste the tab URL into your favorite RSS Reader. If your RSS Feed Reader supports push notifications you can get alerted when trending topics change along with a news article for that topic.

<p align="center">
  <img width="400" src="doc/source/images/rss-2.png">
</p>

<p align="center">
  <img width="400" src="doc/source/images/rss-1.png">
</p>

>Since RSS feed is a standard way to consume constantly changing data such as news, we can use the RSS feeds we generated to also post news articles to your organizations [slack channel](https://get.slack.help/hc/en-us/articles/218688467-Add-RSS-feeds-to-Slack) to track trends in your industry, or consume the feed to generate a dialy digest of news and email in the morning. Other uses may include automaticaly posting tweets to a twitter account on news articles on trending topics using a service called [IFTTT](https://ifttt.com/connect/feed/twitter).

&nbsp;

### Search from Slack

<p align="center">
  <img width="600" src="doc/source/images/slack-3.png">
</p>

# Troubleshooting

* Setting environment variables for a local run

> NOTE: This only needs to be set if the application is running locally.

The credentials for the IBM Cloud services (Discovery), can be found in the ``Services`` menu in IBM Cloud, and selecting the ``Service Credentials``
option.

```
# Watson Discovery
DISCOVERY_USERNAME=<add_discovery_username>
DISCOVERY_PASSWORD=<add_discovery_password>

# Slack
SLACK_BOT_TOKEN=<add_slack_bot_token>
```

* Ensure port is not already in use

If the port is unavailable, you will see the following error:

```
Error: listen EADDRINUSE :::{port}
```

# Privacy Notice

If using the Deploy to IBM Cloud button some metrics are tracked, the following information is sent to a [Deployment Tracker](https://github.com/IBM-Bluemix/cf-deployment-tracker-service) service
on each deployment:

* Node.js package version
* Node.js repository URL
* Application Name (`application_name`)
* Application GUID (`application_id`)
* Application instance index number (`instance_index`)
* Space ID (`space_id`)
* Application Version (`application_version`)
* Application URIs (`application_uris`)
* Labels of bound services
* Number of instances for each bound service and associated plan information

This data is collected from the `package.json` file in the sample application and the ``VCAP_APPLICATION`` and ``VCAP_SERVICES`` environment variables in IBM Cloud and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Cloud to measure the usefulness of our examples, so that we can continuously improve the content we offer to you. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

## Disabling Deployment Tracking

To disable tracking, simply remove ``cf_deployment_tracker.track()`` from the ``app.js`` file in the top level directory.

# Links
* [Demo on Youtube](https://youtu.be/EZGgvci9nC0): Watch the video.
* [Watson Node.js SDK](https://github.com/watson-developer-cloud/node-sdk): Download the Watson Node SDK.
* [Cognitive discovery architecture](https://www.ibm.com/cloud/garage/content/architecture/cognitiveDiscoveryDomain): Learn how this Code Pattern fits into the Cognitive discovery Reference Architecture.
* [Overview of the Watson Discovery service](https://www.ibm.com/watson/services/discovery/): Extract value from unstructured data by converting, normalizing, enriching it.
* [Three ways IBM has evolved Alchemy Data News into Watson Discovery News and made it even better](https://www.ibm.com/blogs/watson/2017/04/3-ways-ibm-evolved-alchemy-data-news-watson-discovery-news-made-even-better/): Watson Discovery News takes big steps forward in NLP-enriched news search.
* [IBM launches Watson Discovery Service for big data analytics at scale](https://www.techrepublic.com/article/ibm-launches-watson-discovery-service-for-big-data-analytics-at-scale/):
Suite of APIs makes it easier for companies to ingest and analyze their data, even if they don’t have advanced degrees in data science.
* [SlideShare: Building with Watson – Network Visualizations using Watson Discovery](https://www.slideshare.net/IBMWatson/building-with-watson-network-visualizations-using-watson-discovery): See an app built on the Watson Discovery Service and D3.js that helps you explore your data using a network map built on NLP metadata.

# Learn more

* **Artificial Intelligence Code Patterns**: Enjoyed this Code Pattern? Check out our other [AI Code Patterns](https://developer.ibm.com/code/technologies/artificial-intelligence/).
* **AI and Data Code Pattern Playlist**: Bookmark our [playlist](https://www.youtube.com/playlist?list=PLzUbsvIyrNfknNewObx5N7uGZ5FKH0Fde) with all of our Code Pattern videos
* **With Watson**: Want to take your Watson app to the next level? Looking to utilize Watson Brand assets? [Join the With Watson program](https://www.ibm.com/watson/with-watson/) to leverage exclusive brand, marketing, and tech resources to amplify and accelerate your Watson embedded commercial solution.

# License

[Apache 2.0](LICENSE)
