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
