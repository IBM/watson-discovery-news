require('dotenv').config({ silent: true });
require('cf-deployment-tracker-client').track();

const server = require('./server');
const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

server.then(app => {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    require('./server/search/slack-bot');
    console.log('Server running on port: %d', port);
  });
});
