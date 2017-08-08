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

import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'watson-react-components';
import { topicStory } from '../../shared/utils';

const MAX_SIZE = 50;
const MIN_SIZE = 16;
let largest;
let ratio;
let computeSize;

const getSentimentColor = item => {
  switch (topicStory(item).enriched_text.sentiment.document.label) {
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
