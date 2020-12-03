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

const util = require('util');
const moment = require('moment');
const aggregations = {
  search: 'term(enriched_text.sentiment.document.label)',
  trending: 'term(enriched_title.entities.text,count:20).top_hits(1)'
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
      environmentId: this.environment_id,
      collectionId: this.collection_id,
      count: 10,
      // sort: 'result_metadata.score',
      return: 'title,text,url,host,crawl_date,result_metadata.score,id,enriched_text.entities.text,enriched_text.sentiment.document.label',
      aggregation: aggregations.search
    }, queryOpts);

    console.log('Discovery Search Query Params: ');
    console.log(util.inspect(params, false, null));

    return params;
  },
  trending(queryOpts = {}) {
    const { filter } = queryOpts;
    const timeAndSourceFilter = `crawl_date>${moment().subtract(24,'h').toISOString().slice(0, -5)}`;

    const params = Object.assign({
      environmentId: this.environment_id,
      collectionId: this.collection_id,
      return: 'enriched_title.entities.text',
      aggregation: aggregations.trending
    }, queryOpts, {
      filter: filter ? `${filter},${timeAndSourceFilter}` : timeAndSourceFilter
    });

    console.log('Discovery Trending Query Params: ');
    console.log(util.inspect(params, false, null));
    return params;
  }
};
