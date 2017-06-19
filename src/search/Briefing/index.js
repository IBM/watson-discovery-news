import React from 'react';
import PropTypes from 'prop-types';

const Briefing = props => (
  <div>
    <div className="top-stories widget">
      <div className="widget--header">
        <h2 className="base--h2 widget--header-title">Briefing from the Top News</h2>
        <div className="widget--header-spacer" />
      </div>
      <div className="top-stories--list">
        {props.items.map(summary => (
          <div key={summary.title}>
            <h4>{summary.title}</h4>
            <p>{summary.text}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  </div>
);

Briefing.propTypes = {
  items: PropTypes.object.isRequired
};

module.exports = Briefing;
