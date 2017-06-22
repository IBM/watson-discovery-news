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
            mainBreadcrumbs="Discover"
            mainBreadcrumbsUrl="http://www.ibm.com/watson/developercloud/discovery.html"
            subBreadcrumbs="Index Page"
            subBreadcrumbsUrl=""
          />
          <Jumbotron
            serviceName="IBM Watson Discovery Service"
            repository=""
            documentation="http://www.ibm.com/watson/developercloud/doc/discovery/index.html"
            apiReference="http://www.ibm.com/watson/developercloud/discovery/api"
            startInBluemix=""
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
