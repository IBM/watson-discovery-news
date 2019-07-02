[![Build Status](https://api.travis-ci.org/IBM/watson-discovery-news.svg?branch=master)](https://travis-ci.org/IBM/watson-discovery-news)

# Query Watson Discovery News using the Watson Discovery Service

## Summary

The web is home to massive amounts of data, with more being created every day. Organizations can harness this constant stream of information to gain understanding, plan strategies, and find opportunities. Enriched news data can help your application make dynamic connections across current events faster. In this exercise, you'll start with the basics and build your own news mining web application using JavaScript, Node.js, and the Watson Discovery service. In this exercise:

* Code is written in Node.js, with the server-side using the Express framework and the client using ReactJS.
* You'll use the pre-built Watson Discovery News collection
* You'll access the Watson Discovery service through the Watson Discovery API

Optionally, you can choose to:

* Use a Slack interface to query the data
* Push news alerts out to an RSS reader
* Host the app on the IBM Cloud

## Description

This code pattern shows you how to tap into massive data sets to mine insight. You'll build a news mining web application with the Watson Discovery service using the Watson Node.js SDK. The app demonstrates two use cases using Watson Discovery News:

* **Search**: Query for the most relevant new articles about a specific topic or subject. Because the news collection is pre-enriched with natural language processing, you can query not just on keywords or categories but also on concepts, sentiment, and relations to get richer search responses.

* **Trending topics in the news**: Identify popular topics over the past 24 hours. Topics can be general, or specific to an industry or category.

## Flow

![architecture](doc/source/images/architecture.png)

1. The user interacts with the Watson Discovery News Server via the app UI.
1. User input is processed and routed to the Watson Discovery News Server.
1. The Watson Discovery News Server sends user requests to the Watson Discovery Service.
1. The Watson Discovery Service queries the Watson News Collection.
1. The Watson Discovery Service sends news articles to the RSS Reader.
1. The Watson Discovery Service responds to Slack search requests.

# Included components

* [Watson Discovery](https://www.ibm.com/watson/services/discovery/): A cognitive search and content analytics engine for applications to identify patterns, trends, and actionable insights.

# Featured technologies

* [Node.js](https://nodejs.org/en/): An asynchronous event driven JavaScript runtime, designed to build scalable applications
* [React](https://reactjs.org/): Javascript library for building User Interfaces
* [Express](https://expressjs.com): A popular and minimalistic web framework for creating API and Web server
* [RSS](https://en.wikipedia.org/wiki/RSS): RSS (Rich Site Summary) is a format for delivering regularly changing web content in our case it will be trending topics
* [Slack](https://slack.com): Slack is a cloud-based set of team collaboration tools and services with chat bot integration
* [Botkit](https://www.botkit.ai): Framework for creating and managing chat bots

# Watch the Video

[![](https://img.youtube.com/vi/EZGgvci9nC0/0.jpg)](https://youtu.be/EZGgvci9nC0)

# Steps

Use the **Deploy to IBM Cloud** button **OR** create the services and run locally.

## Deploy to IBM Cloud

[![Deploy to IBM Cloud](https://cloud.ibm.com/devops/setup/deploy/button.png)](https://cloud.ibm.com/devops/setup/deploy?repository=https://github.com/IBM/watson-discovery-news)

1. Press the **Deploy to IBM Cloud** button and then click on the **Deploy** option. Remember to create an IBM Cloud API key if required.

![deploy](doc/source/images/deploy.png)

2. From the Toolchains view, click on the Delivery Pipeline to watch while the app is deployed. Here you'll be able to see logs about the deployment.

![toolchain-pipeline](doc/source/images/toolchain-pipeline.png)

3. To see the app and services that were created use the [IBM Cloud dashboard](https://cloud.ibm.com). The app is named `watson-discovery-news` with a unique suffix. The following services are created:

    * discovery-news-service

## Run locally

> NOTE: These steps are only needed when running locally instead of using the ``Deploy to IBM Cloud`` button.

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
DISCOVERY_URL=&lt;add_discovery_url&gt;
DISCOVERY_IAM_APIKEY=&lt;add_discovery_iam_apikey&gt;
DISCOVERY_ENVIRONMENT_ID=system
DISCOVERY_COLLECTION_ID=news-en
```

### 5. Run the application

Finally, you'll run the application.

```bash
npm install
npm start
```

The application will be available in your browser at `http://localhost:3000`.

## Sample output

The trending page:

![demo](doc/source/images/sample-output-trending.png)

<br>

The query page:

![demo](doc/source/images/sample-output-query.png)

<br>

## Deep Dive Videos

Here is a series of short videos that go into more of the details about the features of this code pattern.

* Part 1 - Navigating the UI
* Part 2 - Code walkthrough
* Part 3 - Watson Discovery service APIs

[![](https://img.youtube.com/vi/QFwbrTkigmI/0.jpg)](https://www.youtube.com/playlist?list=PLOCckZJT4e3OzgykV0mEpZE6zKHysgIr6)

# Extra Credit

Now that you have built the base application, here are some additional steps you can take to add a Slack interface, and/or provide a way to send new trending news topics to your favorite RSS feed.

## 1. Configure Slack

To integrate a new Slack Bot into your existing Slack team, navigate to `https://<my.slack.com>/apps/manage/custom-integrations`, where `<my.slack.com>` is the Slack workspace you want to customize.

  1. From the **Cutsom Integrations** page, select the **Bots** option.

![slack-integrations](doc/source/images/slack-0.png)

  2, To add a new bot, select the **Add Configuration** button.

![slack-integrations](doc/source/images/slack-00.png)

  3. Enter a username for the bot and click **Add bot integration**.

![slack-bot-name](doc/source/images/slack-1.png)

  4. Once created, save the **API Token** that is generated.

![more-slack-config](doc/source/images/slack-2.png)

## 2. Configure the application to use the Slack bot

### If you runnint the app locally...

  1. Edit the .env file and enter the Slack Bot **API Token** saved in the previous step.

```bash
# Slack
SLACK_BOT_TOKEN=<slack_bot_token>
```

  2. Restart the application.

### If you used the Deploy to IBM Cloud button...

If you used the **Deploy to IBM Cloud** option, most of the setup is automatic, but not quite all of it. We have to update a few environment variables.

  1. From the IBM Cloud dashboard find the app that was created. Click on the **Runtime** tab and navigate to the **Environment variables** tab.

  2. Add and set the Slack Bot **API Token** saved in the previous step.

![environment-variables](doc/source/images/env_vars.png)

  3. Save the new value and restart the application. Watch the logs for errors.

> **Tip**: :bulb: Try restaging your application if you see an error.

## Search from Slack

The slack bot will respond to certain key words, below is a sample dialog. Remember to `@` the bot each time, or start a private chat. Make sure to invite your bot into other channels using `/invite @<my bot>`.

```bash
user: @newsbot hi
newsbot: Hello.

user: @newsbot news please
newsbot: Hi there! What news are you interested in?

user: @newsbot toronto raptors
newsbot: You want me to search for news articles about `toronto raptors`?

user: @newsbot yes
newsbot: OK searching...
```

![slack](doc/source/images/slack-3.png)

## Add a Trending Topics RSS Feed  ![rss](doc/source/images/rss_feed.png)

On the **Trending News Panel**, click the RSS Feed button to launch a new tab in your browser. Cut and paste the tab URL into your favorite RSS Reader. If your RSS Feed Reader supports push notifications you can get alerted when trending topics change along with a news article for that topic.

<p align="center">
  <img src="doc/source/images/rss-2.png">
  <br>
  <img src="doc/source/images/rss-1.png">
</p>

> Since RSS feed is a standard way to consume constantly changing data such as news, we can use the RSS feeds we generated to also post news articles to your organizations [slack channel](https://get.slack.help/hc/en-us/articles/218688467-Add-RSS-feeds-to-Slack) to track trends in your industry, or consume the feed to generate a daily digest of news and email in the morning. Other uses may include automatically posting tweets to a Twitter account on news articles on trending topics using a service called [IFTTT](https://ifttt.com/connect/feed/twitter).

# Links

* [Demo on Youtube](https://youtu.be/EZGgvci9nC0): Watch the video.
* [Watson Node.js SDK](https://github.com/watson-developer-cloud/node-sdk): Download the Watson Node SDK.
* [Cognitive discovery architecture](https://www.ibm.com/cloud/garage/architectures/cognitiveDiscoveryDomain): Learn how this code pattern fits into the Cognitive discovery Reference Architecture.
* [Overview of the Watson Discovery service](https://www.ibm.com/watson/services/discovery/): Extract value from unstructured data by converting, normalizing, enriching it.
* [Three ways IBM has evolved Alchemy Data News into Watson Discovery News and made it even better](https://www.ibm.com/blogs/watson/2017/04/3-ways-ibm-evolved-alchemy-data-news-watson-discovery-news-made-even-better/): Watson Discovery News takes big steps forward in NLP-enriched news search.
* [IBM launches Watson Discovery Service for big data analytics at scale](https://www.techrepublic.com/article/ibm-launches-watson-discovery-service-for-big-data-analytics-at-scale/):
Suite of APIs makes it easier for companies to ingest and analyze their data, even if they don’t have advanced degrees in data science.
* [SlideShare: Building with Watson – Network Visualizations using Watson Discovery](https://www.slideshare.net/IBMWatson/building-with-watson-network-visualizations-using-watson-discovery): See an app built on the Watson Discovery Service and D3.js that helps you explore your data using a network map built on NLP metadata.

# Learn more

* **Artificial Intelligence Code Patterns**: Enjoyed this Code Pattern? Check out our other [AI Code Patterns](https://developer.ibm.com/technologies/artificial-intelligence/).
* **AI and Data Code Pattern Playlist**: Bookmark our [playlist](https://www.youtube.com/playlist?list=PLzUbsvIyrNfknNewObx5N7uGZ5FKH0Fde) with all of our Code Pattern videos
* **With Watson**: Want to take your Watson app to the next level? Looking to utilize Watson Brand assets? [Join the With Watson program](https://www.ibm.com/watson/with-watson/) to leverage exclusive brand, marketing, and tech resources to amplify and accelerate your Watson embedded commercial solution.

# License

This code pattern is licensed under the Apache Software License, Version 2.  Separate third party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
