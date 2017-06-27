require('dotenv').config({ silent: true });
require('cf-deployment-tracker-client').track();

const server = require('./server');
const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

server.then(app => {
  app.listen(port, () => {
    require('./server/slack-bot');
    // eslint-disable-next-line no-console
    console.log('Watson Discovery News Server running on port: %d', port);
  });
});
