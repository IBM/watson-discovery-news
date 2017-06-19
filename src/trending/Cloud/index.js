import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'watson-react-components';
import { topicStory } from '../utils';

const MAX_SIZE = 50;
const MIN_SIZE = 16;
let largest;
let ratio;
let computeSize;

const getSentimentColor = item => {
  switch (topicStory(item).docSentiment.type) {
  case 'negative': return Colors.red_50;
  case 'positive': return Colors.green_50;
  default: return Colors.gray_50;
  }
};

const Cloud = props => {
  largest = props.data ?
    props.data.reduce((prev, cur) => (cur.matching_results > prev ? cur.matching_results : prev), 0) :
    0;
  ratio = MAX_SIZE / largest;
  computeSize = (value) => Math.max(MIN_SIZE, value * ratio);
  return (
    <div className="top-topics--cloud">
      {
        props.data ?
        props.data.map((item, index) =>
          <a
            key={`${index}-${item.key}`}
            target="_blank"
            rel="noopener noreferrer"
            href={topicStory(item).url}
            className="top-topics--word"
            title={item.matching_results}
            style={{
              fontSize: `${computeSize(item.matching_results)}px`,
              fontWeight: (computeSize(item.matching_results) < 13 ? 400 : null),
              color: getSentimentColor(item)
            }}
          >
            {item.key}
          </a>) :
        []
      }
    </div>
  );
};

Cloud.propTypes = {
  data: PropTypes.array.isRequired,
};

module.exports = Cloud;
