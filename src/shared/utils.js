const parseData = data => ({
  topics: data.aggregations[0].results,
  rawData: data
});

const topicStory = item => item.aggregations[0].hits.hits[0];

const objectWithoutProperties = (object, properties) => {
  'use strict';

  var obj = {};
  var keys = Object.keys(object);
  keys.forEach(key => {
    if (!~properties.indexOf(key)) {
      obj[key] = object[key];
    }
  });
  return obj;
};

module.exports = {
  parseData,
  topicStory,
  objectWithoutProperties
};
