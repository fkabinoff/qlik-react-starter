const React = require('react');

const resolve = (WrappedComponent, promise) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: null, value: null };
  }

  componentDidMount() {
    this.props[promise].then(
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
    const { ...passThroughProps } = this.props;
    passThroughProps[promise] = this.state.value;
    return <WrappedComponent {...passThroughProps} />;
  }
};

export default resolve;
