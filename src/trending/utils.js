const parseData = data => ({
  topics: data.aggregations[0].results,
  rawData: data
});

const topicStory = item => item.aggregations[0].hits.hits[0];

module.exports = {
  parseData,
  topicStory
};
