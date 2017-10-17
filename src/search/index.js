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
import { TextInput, Icon } from 'watson-react-components';

export default class Search extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      searchQuery: this.props.searchQuery || ''
    };
  }

  handleInputChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleSearchPress() {
    this.props.onSearchQueryChange({
      searchQuery: this.state.searchQuery
    });
  }

  handleKeyPress(event) {
    const searchValue = event.target.value;
    if (event.key === 'Enter' && searchValue.match(/[^\s]+/)) {
      this.props.onSearchQueryChange({
        searchQuery: searchValue
      });
    }
  }

  render() {
    return (
      <section className="_full-width-row query query_collapsed">
        <div className="_container _container_large">
          <div className="query--flex-container">
            <div className="query--text-input-container">
              <div className="query--search-container">
                <TextInput
                  placeholder={'Enter search string'}
                  onKeyPress={this.handleKeyPress.bind(this)}
                  onInput={this.handleInputChange.bind(this)}
                  defaultValue={this.state.searchQuery}
                />
                <div onClick={this.handleSearchPress.bind(this)} className="query--icon-container">
                  <Icon type="search" size="regular" fill="#ffffff" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Search.propTypes = {
  onSearchQueryChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string
};
