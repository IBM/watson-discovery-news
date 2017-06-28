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
  getDescription() {
    return (
      <div>
        <div>
          This is a web app to help you find News related to a specific topic using Watson Discovery Service.
        </div>
        <div>Try out some of the following queries:</div>
        <ul>
          <li>Merger and Acquisition in Artificial Intelligence industry</li>
          <li>Tech IPOs</li>
          <li>Acquisition in Insurance Industry</li>
          <li>Healthcare startups</li>
        </ul>  
      </div>
    );
  }

  render() {
    const { hideHeader } = this.props;

    return (
      <html>
        <head>
          <title>News using Watson Discovery Service</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="og:title" content="Watson Discovery News Search" />
          <meta name="og:description" content={this.props.description || 'Search News using Watson Discovery Service'} />
          <link rel="stylesheet" type="text/css" href="/css/watson-react-components.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/application.css"/>
        </head>
        <body>
          {!hideHeader && <div>
            <Header
              mainBreadcrumbs="Home"
              mainBreadcrumbsUrl="/"
              subBreadcrumbs="News Search"
              subBreadcrumbsUrl="/search"
            />
            <Jumbotron
              serviceName="News using Watson Discovery Service"
              repository="https://github.com/IBM/watson-discovery-news"
              documentation="http://www.ibm.com/watson/developercloud/doc/discovery/index.html"
              apiReference="http://www.ibm.com/watson/developercloud/discovery/api"
              startInBluemix="https://console.ng.bluemix.net/registration/?target=/catalog/services/discovery/"
              version="GA"
              description={this.getDescription()}
            />
          </div>}
          <main>{this.props.children}</main>
          <script
            type="text/javascript"
            id="bootstrap-data"
            dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${this.props.initialData};`}}
          ></script>
          <script type="text/javascript" src="/js/search/bundle.js" />
        </body>
      </html>
    );
  }
}

DefaultLayout.propTypes = {
  hideHeader: PropTypes.bool,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  initialData: PropTypes.string.isRequired
};

module.exports = DefaultLayout;
