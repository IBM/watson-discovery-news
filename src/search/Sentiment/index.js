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
