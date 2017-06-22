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
              mainBreadcrumbs="Discover"
              mainBreadcrumbsUrl="http://www.ibm.com/watson/developercloud/discovery.html"
              subBreadcrumbs="News Search"
              subBreadcrumbsUrl=""
            />
            <Jumbotron
              serviceName="News using Watson Discovery Service"
              repository=""
              documentation="http://www.ibm.com/watson/developercloud/doc/discovery/index.html"
              apiReference="http://www.ibm.com/watson/developercloud/discovery/api"
              startInBluemix=""
              version="GA"
              description={this.getDescription()}
            />
          </div>}
          <main>{this.props.children}</main>
          <script
            type="text/javascript"
            id="bootstrap-data"
            dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${this.props.initialData}`}}
          ></script>
          <script type="text/javascript" src="js/search/bundle.js" />
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
