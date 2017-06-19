import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Bar, Icon } from 'watson-react-components';

const Story = props => (
  <div className="story">
      <div className="story--date">
        {moment(props.date * 1000).format('M/D/YYYY hh:MMa')}
      </div>
    <a
      className="story--title base--a results--a"
      href={props.url}
      target="_blank"
      title={props.title}
      rel="noopener noreferrer"
    >
      {props.title} {props.sentiment}
    </a>
    <div className="story--source-and-score">
      <span className="base--p story--source">
        {props.host ? props.host : 'Placeholder Source'}
      </span>
      <div className="story--score base--p">Confidence Score: <Bar rangeStart={0} rangeEnd={2}  score={props.score} /></div>
    </div>
  </div>
);

Story.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  host: PropTypes.string,
  sentiment: PropTypes.node,
  score: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired
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
            title={item.enrichedTitle ? item.enrichedTitle.text : (item.title || 'Untitled')}
            url={item.url}
            host={item.host}
            score={item.score}
            sentiment={getSentiment(item)}
            date={item.blekko.chrondate}
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
  switch (item.docSentiment && item.docSentiment.type) {
  case 'negative': return <Icon type="thumbs-down" size="small" />;
  case 'positive': return <Icon type="thumbs-up" size="small" />;
  default: return '';
  }
};

module.exports = TopStories;
