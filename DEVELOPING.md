# Project Structure

Below is a general overview of the most important directories and files in the project.

```
.
├── CONTRIBUTING.md # Contains information on how to contribute
├── LICENSE # License under which the software is release
├── README.md # Overview on the project and how to get started
├── index.js # Entry point into the project which starts up the server
├── manifest.yml # Configuration used to deploy app to Bluemix
├── package.json # Config file containing dependencies and scripts and babel config
├── .env.sample # Sample environment variable files
├── public # Public folder contains CSS and JS served on the webpage
│   ├── css
│   │   └── application.css
│   ├── images # Image asset folder
│   └── js
│       └── bundle.js # Entry point for client (browser) side JS code
├── server # Contains code specific to the server
│   ├── express.js # File that configures express
│   ├── index.js # Configures the endpoint for Discovery API and create express server
│   ├── query-builder.js # Helper file which helps generate the query params passed to Discovery API
│   └── watson-developer-cloud.js # Helper file to promisify Waston SDK APIs
├── src # Views that get rendered by the server and the client bundle.js
│   ├── Cloud # Component that renders topics trending
│   ├── Query # Component that renders the query performed
│   ├── index.js # index HTML view that is rendered by the server
│   ├── utils.js # Helper file containing utility functions shared in the project
│   ├── layouts # Layout which contains HTML structure
│   │   └── default.js
│   └── main.js # Main component which gets rerendered by the client JS bundle
└── yarn.lock # Yarn lockfile to lock down dependencies
```
