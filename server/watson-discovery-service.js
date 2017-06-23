const Promise = require('bluebird');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const vcapServices = require('vcap_services');

const discoveryCredentials = vcapServices.getCredentials('discovery');

const discovery = new DiscoveryV1({
  username: discoveryCredentials.username,
  password: discoveryCredentials.password,
  version_date: DiscoveryV1.VERSION_DATE_2017_04_27,
});

discovery.getEnvironments = Promise.promisify(discovery.getEnvironments);
discovery.getCollections = Promise.promisify(discovery.getCollections);
discovery.query = Promise.promisify(discovery.query);

module.exports = discovery;
