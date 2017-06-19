import React from 'react';
import PropTypes from 'prop-types';
import { Code } from 'watson-react-components';

const Query = props => (
  <div className="code-results">
    <div className="code-results--header-row">
      <h2 className="base--h2 code-results--header">{props.title}</h2>
      <div className="code-results--header-spacer" />
    </div>
    <Code language="json">
      {typeof props.query === 'object' ?
      JSON.stringify(props.query, null, 2) : props.query}
    </Code>
  </div>
);

Query.propTypes = {
  query: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string, // json string
  ]).isRequired,
  response: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string, // json string
  ]).isRequired,
  title: PropTypes.string.isRequired,
};


export default Query;
