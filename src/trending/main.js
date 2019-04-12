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

import 'isomorphic-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'watson-react-components';
import Cloud from './Cloud';
import Query from '../shared/Query';
import queryBuilder from '../../server/query-builder';
import { parseData } from '../shared/utils';
import categories from './taxonomy';

class Main extends React.Component {

  constructor(...props) {
    super(...props);

    this.state = {
      error: null,
      data: null,
      loading: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      loading: true,
    });

    const { category } = this.props;

    fetch(`/trending/api/trending/${category ? category : ''}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(json => {
        this.setState({
          data: parseData(json),
          loading: false,
          error: null
        });
      })
      .catch(response => {
        let error;
        if (response && response.status === 429) {
          error = 'Number of free queries per month exceeded';
        } else {
          error = 'Error fetching data from the server';
        }

        // eslint-disable-next-line no-console
        console.error(response);
        this.setState({
          data: null,
          error,
          loading: false
        });
      });
  }

  render() {
    const { loading, data, error } = this.state;
    const { category } = this.props;
    const filter = category ? `enriched_text.categories.label:"${category}"` : '';

    return (
      <div className="results">
        <div className="_container _container_large">
          <div className="row">
            <div className="top-stories widget">
              <div className="widget--header">
                <h1 className="base--h2 widget--header-title">
                  Trending Topics in News {category && `for ${category.toUpperCase()}`}
                  <a href={`/trending/feed/${category ? category : ''}`} className="rss-feed--icon">
                    <img src="/images/feed-icon.png" />
                  </a>
                </h1>
                <div className="widget--header-spacer" />
              </div>
              {loading || !data ? (
                <div className="results">
                  <div className="loader--container">
                    {error ? error : <Icon type="loader" size="large" />}
                  </div>
                </div>
              ) : (
                <div className="top-stories--list">
                  <Cloud data={data.topics} />
                  <Query
                    title="Query to the Discovery Service"
                    query={queryBuilder.trending({ filter })}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="_container _container_large">
          <div className="row">
            <div className="top-stories widget">
              <h2>Trending Topics in Other Categories</h2>
              <div>You can also view trending topics for certain categories below and subscribe to its RSS feed:</div>
              <ul>
                {categories.map(category =>
                  <li key={category}>
                    <a href={`/trending${category}`} target="_blank" rel="noopener noreferrer">{category.toUpperCase().substring(1)}</a>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  category: PropTypes.string
};

module.exports = Main;
