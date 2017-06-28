/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Header, Jumbotron } from 'watson-react-components';

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>News using Watson Discovery Service</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="og:title" content="Watson Discovery Trending Topics in News" />
          <meta name="og:description" content={this.props.description || 'Get RSS Feed for Trending Topics in News'} />
          <link rel="stylesheet" type="text/css" href="/css/watson-react-components.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/application.css"/>
          <link rel="alternate" type="application/rss+xml" href="/feed" />
        </head>
        <body>
          <Header
            mainBreadcrumbs="Home"
            mainBreadcrumbsUrl="/"
            subBreadcrumbs="Trending News Topics"
            subBreadcrumbsUrl="/trending"
          />
          <Jumbotron
            serviceName="Trending Topics"
            repository="https://github.com/IBM/watson-discovery-news"
            documentation="http://www.ibm.com/watson/developercloud/doc/discovery/index.html"
            apiReference="http://www.ibm.com/watson/developercloud/discovery/api"
            startInBluemix="https://console.ng.bluemix.net/registration/?target=/catalog/services/discovery/"
            version="GA"
            description={`This is a web app to help you find Trending Topics in the News
              using Watson Discovery Service. You can subscribe to these trending
              topics and the story for that trending topic using a RSS feed reader
              by clicking on the RSS button below.`}
          />
          <main>{this.props.children}</main>
          <script
            type="text/javascript"
            id="bootstrap-data"
            dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${this.props.initialData};`}}
          ></script>
          <script type="text/javascript" src="/js/trending/bundle.js" />
        </body>
      </html>
    );
  }
}

DefaultLayout.propTypes = {
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  initialData: PropTypes.string.isRequired
};

module.exports = DefaultLayout;
