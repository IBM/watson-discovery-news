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

const React = require('react');
const DefaultLayout = require('./layouts/default');
const Main = require('./main');

function objectWithoutProperties (object, properties) {
  'use strict';

  var obj = {};
  var keys = Object.keys(object);
  keys.forEach((key) => {
    if (!~properties.indexOf(key)) {
      obj[key] = object[key];
    }
  });
  return obj;
}

class Application extends React.Component {
  render() {
    const props = objectWithoutProperties(this.props, ['settings', '_locals', 'cache']);

    return (
      <DefaultLayout title={props.title} initialData={JSON.stringify(props)}>
        <Main {...props} />
      </DefaultLayout>
    );
  }
}

module.exports = Application;
