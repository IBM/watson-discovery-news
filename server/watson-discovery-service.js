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
const DiscoveryV1 = require('ibm-watson/discovery/v1');

var discovery;
const version_date = '2019-11-01';

discovery = new DiscoveryV1({
  version: version_date
});

discovery.environmentId = 'system';
discovery.collectionId = 'news-en';

discovery.listEnvironments = Promise.promisify(discovery.listEnvironments);
discovery.query = Promise.promisify(discovery.query);

module.exports = discovery;
