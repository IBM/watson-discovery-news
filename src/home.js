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

import { Header, Jumbotron, Footer } from 'watson-react-components';
const React = require('react');

class Application extends React.Component {
  getDescription() {
    return (
      <div>
        <div>
          This web app showcases multiple ways to utilize the Watson Discovery Service to
          query data collections, such as Watson News.
          <br />
          <br />
          Watson News is a pre-enriched dataset that is updated continuosly with
          over 300,000 news articles and blogs a day.
          <br />
          <br />
        </div>
      <div>Select from one of the following examples:</div>
        <ul>
          <li>
            <a href="./trending">Find Trending Topics in Watson News</a>
          </li>
          <li>
            <a href="./search">Search Watson News for Specific Topics</a>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <html>
        <head>
          <title>Watson Discovery</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="og:title" content="Watson Discovery" />
          <link rel="stylesheet" type="text/css" href="/css/watson-react-components.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/application.css"/>
        </head>
        <body>
          <Header
            mainBreadcrumbs="Home"
            mainBreadcrumbsUrl="/"
          />
          <Jumbotron
            serviceName="IBM Watson Discovery Service"
            repository="https://github.com/IBM/watson-discovery-news"
            documentation="http://www.ibm.com/watson/developercloud/doc/discovery/index.html"
            apiReference="http://www.ibm.com/watson/developercloud/discovery/api"
            startInBluemix="https://cloud.ibm.com/registration/?target=/catalog/services/discovery/"
            version="GA"
            description={this.getDescription()}
          />
          <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Application;
