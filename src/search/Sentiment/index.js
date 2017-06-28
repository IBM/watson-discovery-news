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
import { BarChart, XAxis, YAxis, Bar, CartesianGrid, Legend } from 'recharts';
import { Colors } from 'watson-react-components';

class Sentiment extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleResize = this.handleResize.bind(this);
    this.state = { width: 0 };
  }

  handleResize() {
    this.setState({
      width: this.el.getBoundingClientRect().width - 64
    });
  }

  componentDidMount() {
    this.setState({
      width: this.el.getBoundingClientRect().width - 64
    });
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div ref={el => { this.el = el; }}>
        <div className="top-stories widget">
          <div className="widget--header">
            <h2 className="base--h2 widget--header-title">Sentiment Expressed</h2>
            <div className="widget--header-spacer" />
          </div>
          <div>Below is the total count of the number of news articles that have negative, neutral or positive sentiment
              expressed in the article related to your search query above.</div>
          <div className="top-stories--list">
            <BarChart width={this.state.width} height={250} data={[this.props.data]}>
              <XAxis dataKey="Article Count" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Legend />
              <Bar dataKey="negative" fill={Colors.red_50} />
              <Bar dataKey="neutral" fill={Colors.gray_50} />
              <Bar dataKey="positive" fill={Colors.green_50} />
            </BarChart>
          </div>
        </div>
      </div>
    );
  }
}

Sentiment.propTypes = {
  data: PropTypes.object.isRequired
};

module.exports = Sentiment;
