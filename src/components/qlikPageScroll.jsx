import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

const qlikPageScroll = Component => class extends React.Component {
  static propTypes = {
    qMatrix: PropTypes.array.isRequired,
    qSize: PropTypes.object.isRequired,
    qPages: PropTypes.array.isRequired,
    setPages: PropTypes.func.isRequired,
    threshold: PropTypes.number,
  }

  static defaultProps = {
    threshold: 20,
  }

  constructor(props) {
    super(props);

    this.state = {
      scrollTop: 0,
    };
  }

  @autobind
  handleScroll(event) {
    this.setState({ scrollTop: event.target.scrollTop }, () => {
      const qTop = Math.floor(this.state.scrollTop / this.props.threshold);
      const qPages = this.props.qPages.map(qPage => ({ ...qPage, qTop }));
      this.props.setPages(qPages);
    });
  }

  render() {
    return (
      <div style={{ height: '100px', overflowY: 'auto' }} onScroll={this.handleScroll}>
        <div style={{ height: '100%', overflowY: 'hidden', transform: `translateY(${this.state.scrollTop}px)` }}>
          <Component {...this.props} />
        </div>
        <div style={{ height: `${Math.min(this.props.threshold * this.props.qSize.qcy, 10000)}px` }} />
      </div>
    );
  }
};

export default qlikPageScroll;
