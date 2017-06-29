# Project Structure

Below is a general overview of the most important directories and files in the project.

```
.
├── env.sample # Sample environment variable files that needs to be copied to .env file
├── app.js # Entry point of the application
├── manifest.yml # Configuration used to deploy app to Bluemix
├── package.json# Config file containing dependencies and scripts and babel config
├── public # Public folder contains CSS and JS served on the webpage
│   ├── css
│   ├── images
│   └── js
│       ├── search
│       │   └── bundle.js # Entry point for code run in the browser for search page
│       └── trending
│           └── bundle.js # Entry point for code run in the browser for trending page
├── server # Contains code specific to the server
│   ├── express.js # File that configures express
│   ├── index.js # Configures the endpoint for Discovery API and create express server
│   ├── query-builder.js # Helper file which helps generate the query params passed to Discovery API
│   ├── slack-bot.js # Entry point to start up slack bot
│   └── watson-discovery-service.js # Helper file to promisify Waston SDK APIs
├── src # Views that get rendered by the server and the client bundle.js
│   ├── home.js # Component that renders the home page
│   ├── search # Folder containing code related to /search page
│   │   ├── Briefing # Briefing Component
│   │   ├── Search # Search Component
│   │   ├── Sentiment # Sentiment Component
│   │   ├── TopStories # TopStories and Story Component
│   │   ├── index.js # HTML view that is rendered for /search/
│   │   ├── layouts # Layout for search page
│   │   │   └── default.js
│   │   └── main.js # Main component of Search which is rendered as HTML server side and contains client side code
│   ├── shared # Folder containing shared code across pages
│   │   ├── Query # Component that renders the query performed
│   │   └── utils.js # Helper file containing utility functions shared in the project
│   └── trending # Folder containing code related to /trending page
│       ├── Cloud # Component that renders topics trending
│       ├── index.js # HTML view that is rendered for /trending/
│       ├── layouts # Layout for trending page
│       │   └── default.js
│       ├── main.js # Main component of Trending which is rendered as HTML server side and contains client side code
│       └── taxonomy.js # File containing taxonomy that are listed in the /trending/ page
└── yarn.lock # Yarn lockfile to lock down dependencies
```
