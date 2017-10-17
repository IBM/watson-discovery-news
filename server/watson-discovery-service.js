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

const Promise = require('bluebird');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

const discovery = new DiscoveryV1({
  version_date: '2017-08-01'
});

discovery.environmentId = 'e52e21d1-0295-4c62-991c-1f0686b65fc9';
discovery.collectionId = '05f0711c-db65-4344-994b-ec2c9353dd5a';

discovery.getEnvironments = Promise.promisify(discovery.getEnvironments);
discovery.query = Promise.promisify(discovery.query);

module.exports = discovery;
