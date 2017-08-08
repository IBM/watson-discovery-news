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
import queryString from 'query-string';
import TopStories from './TopStories';
import Briefing from './Briefing';
import Sentiment from './Sentiment';
import Search from './Search';
import Query from '../shared/Query';
import queryBuilder from '../../server/query-builder';

class Main extends React.Component {

  constructor(...props) {
    super(...props);
    const { data, searchQuery, error } = this.props;

    this.state = {
      selectedTab: 'news',
      error: error,
      data: data && parseData(data),
      loading: false,
      searchQuery: searchQuery || ''
    };
  }

  onTabChange(selectedTab) {
    this.setState({ selectedTab });
  }

  fetchData(query) {
    const { searchQuery } = query;

    this.setState({
      loading: true,
      searchQuery
    });

    scrollToMain();
    history.pushState({}, {}, `/search/${searchQuery.replace(/ /g, '+')}`);

    const qs = queryString.stringify({ query: searchQuery });
    fetch(`/search/api/search?${qs}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    })
    .then(json => {
      this.setState({ data: parseData(json), loading: false, error: null });
      scrollToMain();
    })
    .catch(response => {
      this.setState({
        error: (response.status === 429) ? 'Number of free queries per month exceeded' : 'Error fetching results',
        loading: false,
        data: null
      });
      // eslint-disable-next-line no-console
      console.error(response);
    });
  }

  getContent() {
    const { data } = this.state;

    if (!data) {
      return null;
    }

    switch (this.state.selectedTab) {
    case 'news':      return <TopStories stories={data.results} />;
    case 'briefing':  return <Briefing items={data.briefingItems} />;
    case 'sentiment': return <Sentiment data={data.sentiment} />;
    case 'query':     return <Query
                              title="Query to and Response from the Discovery Service"
                              query={queryBuilder.search({
                                natural_language_query: this.state.searchQuery
                              })}
                              response={data.rawResponse}
                            />;
    default:          return null;
    }
  }

  render() {
    const { selectedTab, loading, data, error, searchQuery } = this.state;

    return (
      <div>
        <Search
          onTabChange={this.onTabChange.bind(this)}
          onSearchQueryChange={this.fetchData.bind(this)}
          selectedTab={selectedTab}
          showTabs={!loading && Boolean(data)}
          searchQuery={searchQuery}
        />
        {loading ? (
          <div className="results">
            <div className="loader--container">
              <Icon type="loader" size="large" />
            </div>
          </div>
        ) : data ? (
          <div className="results">
            <div className="_container _container_large">
              <div className="row">
                {this.getContent()}
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="results">
            <div className="_container _container_large">
              <div className="row">
                {JSON.stringify(error)}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Main.propTypes = {
  data: PropTypes.object,
  searchQuery: PropTypes.string,
  error: PropTypes.object
};

const getTitleForItem = item => item.title ? item.title : 'Untitled';

const parseData = data => ({
  rawResponse: Object.assign({}, data),
  sentiment: data
    .aggregations[0]
    .results.reduce((accumulator, result) =>
      Object.assign(accumulator, { [result.key]: result.matching_results }), {}),
  results: data.results,
  briefingItems: data
    .results
    .map(item => ({
      title: getTitleForItem(item),
      text: item.text
    }))
});

function scrollToMain() {
  setTimeout(() => {
    const scrollY = document.querySelector('main').getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, scrollY);
  }, 0);
}

module.exports = Main;
