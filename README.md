[![Build Status](https://travis-ci.org/IBM/watson-discovery-news.svg?branch=master)](https://travis-ci.org/IBM/watson-discovery-news)

# Watson Discovery News Trending Topics Web App 

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/IBM/watson-discovery-news)

In this developer journey we will build a RSS News Feed generator for Trending Topics for the past 24 hours for the entire news in general or a specific industry/category such as (technology and computing or automobile and vehicles, etc.) and subscribe to the feed to get push notifications. This journey explores the use of Discovery Service to get the most trending topics in news or a specific category of news.

Once you are done with this journey you will know how to:

1. Built and run server that serves RSS feed with a HTML frontend written in React
2. Configure Discovery Service with the App
3. Deploy the app to IBM Bluemix using cloudfoundry CLI tool
4. Add the RSS feed to your RSS reader and get push notification when new trending topics changes along with news article for it.

# Repo Contents

This repo contains code for
1. Responsive Frontend web application built using React
2. Backend Web and RSS Feed Server built using express

# Included components

* [Watson Discovery](https://www.ibm.com/watson/developercloud/discovery.html) - Rapidly build a cognitive search and content analytics engine

# Featured technologies

* [Node.js](https://nodejs.org/en/) - An asynchronous event driven JavaScript runtime, designed to build scalable applications
* [RSS](https://en.wikipedia.org/wiki/RSS) - RSS (Rich Site Summary) is a format for delivering regularly changing web content in our case it will be trending topics
* [React](https://facebook.github.io/react/) - Javascript library for building User Interfaces
* [express](https://expressjs.com) - Most popular and minimalistic web framework for creating API and Web server
* [yarn](https://yarnpkg.com) - Fast, reliable and secure dependency manager for node.js

# Getting Started

## Prerequisites

Make sure before you start you have the following tasks done:

1. Install [nodejs](https://nodejs.org/en/) and [yarn](https://yarnpkg.com)
2. Install the [Cloud-foundry CLI](https://github.com/cloudfoundry/cli) tool
3. Have a [Bluemix account](https://console.ng.bluemix.net/registration/)

## Steps

### 1. Clone the repo

Clone the repo by running the following command in the terminal and go into that directory.

```sh
$ git clone https://github.com/IBM/watson-discovery-news/
$ cd watson-discovery-news
```

### 2. Install the dependencies and bootstrap

Install all of the dependencies by running `yarn` command. This will install of the node modules specified in the package.json

```sh
$ yarn
```

Then run `yarn bootstrap` to copy the `.env.sample` to `.env` and fill in the credentials in the `.env` file by following the next steps.

```sh
$ yarn bootstrap
```

### 3. Create Bluemix Services

Create the following services:

* [Watson Discovery](https://console.ng.bluemix.net/catalog/services/discovery?env_id=ibm:yp:us-south)


### 4. Configure Watson Discovery

Fill in name you want to give to your service along with a name where credentials will be saved and click *Create*.

![Create Discovery Service Service](https://raw.githubusercontent.com/IBM/watson-discovery-news/master/docs/discovery-1.png)


After the service is created, click on *Service credentials* and then click on *View Credentials* and copy the *username* and *password* values into the `.env` after the `=` sign for `DISCOVERY_SERVICE_USERNAME` and `DISCOVERY_SERVICE_PASSWORD` environment variables.

![Discovery Service Credentials](https://raw.githubusercontent.com/IBM/watson-discovery-news/master/docs/discovery-2.png)

### 5. Start Everything

Start the app by running `yarn start`. If you are developing and making changes to the app and would like the server to restart every time then run `yarn start:watch`

```sh
$ yarn start
```

Open the browser and go to `http://localhost:3333`

### 8. Deploy to Bluemix

To deploy to Bluemix make sure you have cloud foundry CLI tool installed. Then run the following commands to connect it with Bluemix and login with your Bluemix credentials.

```sh
$ cf api https://api.ng.bluemix.net
$ cf login
```

Then to deploy just run the following command and it will push the code, deploy it to a server and run it.

```sh
$ cf push
```

Go to the URL that is printed at the end after deployment is done and you can view the app in the browser and copy the RSS link to your favorite RSS Reader. If your RSS Feed Reader supports push notifications you can get alerted when trending topics change along with a news article for that topic.

![RSS feed notification](https://raw.githubusercontent.com/IBM/watson-discovery-news/master/docs/rss-2.png)

![RSS feed notifications](https://raw.githubusercontent.com/IBM/watson-discovery-news/master/docs/rss-1.png)

## RSS Feed Usage

Since RSS feed is a standard way to consume constantly changing data such as news, we can use the RSS feeds we generated to also post news articles to your organizations [slack channel](https://get.slack.help/hc/en-us/articles/218688467-Add-RSS-feeds-to-Slack) to track trends in your industry, or consume the feed to generate a dialy digest of news and email in the morning. Other uses may include automaticaly posting tweets to a twitter account on news articles on trending topics using a service called [IFTTT](https://ifttt.com/connect/feed/twitter).
