const React = require('react');

const resolve = (WrappedComponent, asyncFunc) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: null, value: null };
  }

  componentDidMount() {
    asyncFunc(this.props).then(
      value => this.setState({ loading: false, value }),
      error => this.setState({ loading: false, error }),
    );
  }

  render() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    }
    return <WrappedComponent {...this.state.value} {...this.props} />;
  }
};

export default resolve;
