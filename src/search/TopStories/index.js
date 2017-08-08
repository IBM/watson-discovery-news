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
import moment from 'moment';
import { Bar, Icon } from 'watson-react-components';

const Story = props => (
  <div className="story">
      <div className="story--date">
        {moment(props.date).format('M/D/YYYY hh:MMa')}
      </div>
    <a
      className="story--title base--a results--a"
      href={props.url}
      target="_blank"
      title={props.title}
      rel="noopener noreferrer"
    >
      {props.title}
    </a>
    <div className="story--source-and-score">
      <span className="base--p story--source">
        {props.host ? props.host : 'Placeholder Source'}
      </span>
      <div className="story--score base--p">Confidence Score: <Bar rangeStart={0} rangeEnd={5}  score={props.score} /></div>
      <div className="story--sentiment base--p">Sentiment: {props.sentiment}</div>
    </div>
  </div>
);

Story.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  host: PropTypes.string,
  sentiment: PropTypes.node,
  score: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired
};

const TopStories = props => (
  <div>
    <div className="top-stories widget">
      <div className="widget--header">
        <h2 className="base--h2 widget--header-title">Top News</h2>
        <div className="widget--header-spacer" />
      </div>
      <div className="top-stories--list">
        {props.stories.map(item =>
          <Story
            key={item.id}
            title={item.title ? item.title : 'Untitled'}
            url={item.url}
            host={item.host}
            score={item.score}
            sentiment={getSentiment(item)}
            date={item.crawl_date}
          />)
        }
      </div>
    </div>
  </div>
);

TopStories.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired
};

const getSentiment = item => {
  switch (item.enriched_text.sentiment && item.enriched_text.sentiment.document && item.enriched_text.sentiment.document.label) {
  case 'negative': return <Icon type="thumbs-down" size="small" />;
  case 'positive': return <Icon type="thumbs-up" size="small" />;
  default: return '';
  }
};

module.exports = TopStories;
