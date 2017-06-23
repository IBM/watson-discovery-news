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
