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

const moment = require('moment');
const aggregations = {
  search: [
    'term(docSentiment.type)'
  ],
  trending: [
    'term(enrichedTitle.entities.text,count:20).top_hits(1)'
  ]
};

module.exports = {
  aggregations,
  setEnvironmentId(environmentId) {
    this.environment_id = environmentId;
  },
  setCollectionId(collectionId) {
    this.collection_id = collectionId;
  },
  search(queryOpts) {
    const params = Object.assign({
      environment_id: this.environment_id,
      collection_id: this.collection_id,
      count: 10,
      sort: '-_score',
      filter: 'blekko.hostrank>500',
      return: 'enrichedTitle.text,text,title,url,host,blekko.chrondate,blekko.hostrank,score,id,entities.text,docSentiment.type',
      aggregation: aggregations.search
    }, queryOpts);

    return params;
  },
  trending(queryOpts = {}) {
    const { filter } = queryOpts;
    const timeAndSourceFilter = `blekko.chrondate>${moment().subtract(24,'h').unix()},blekko.hostrank>300`;

    const params = Object.assign({
      environment_id: this.environment_id,
      collection_id: this.collection_id,
      return: 'enrichedTitle.entities.text',
      aggregation: aggregations.trending
    }, queryOpts, {
      filter: filter ? `${filter},${timeAndSourceFilter}` : timeAndSourceFilter
    });

    return params;
  }
};
