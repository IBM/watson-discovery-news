const React = require('react');
const PropTypes = require('prop-types');
const DefaultLayout = require('./layouts/default');
const Main = require('./main');
const objectWithoutProperties = require('./utils').objectWithoutProperties;

class Application extends React.Component {
  render() {
    const props = objectWithoutProperties(this.props, ['settings', '_locals', 'cache']);

    return (
      <DefaultLayout
        title={props.title}
        initialData={JSON.stringify(props)}
        hideHeader={Boolean(props.searchQuery)}
      >
        <Main {...props} />
      </DefaultLayout>
    );
  }
}

Application.propTypes = {
  data: PropTypes.object,
  searchQuery: PropTypes.string
};

module.exports = Application;
