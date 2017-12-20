import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

export default class QlikVirtualScroll extends React.Component {
  static propTypes = {
    qMatrix: PropTypes.array.isRequired,
    qPages: PropTypes.array.isRequired,
    qSize: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired,
    renderProps: PropTypes.object,
    setPages: PropTypes.func.isRequired,
    viewportHeight: PropTypes.number,
    virtualRowHeight: PropTypes.number,
  }

  static defaultProps = {
    renderProps: {},
    viewportHeight: 200,
    virtualRowHeight: 34,
  }

  constructor(props) {
    super(props);

    this.state = {
      prevScrollPos: 0,
      qTop: 0,
      start: 0,
      translateY: 0,
    };
  }


  // NOTE: Instead of trying to find physical point at which data runs out,
  // just check if index is close to end of qMatrix in memory
  @autobind
  handleScroll(event) {
    const currScrollPos = event.target.scrollTop;
    const { viewportHeight, virtualRowHeight } = this.props;
    const { qTop, qHeight } = this.props.qPages[0];
    const start = Math.floor(currScrollPos / virtualRowHeight);
    const end = Math.ceil((currScrollPos + viewportHeight) / virtualRowHeight);

    // if scroll is going down, and index of last loaded element is less than the end index
    if (this.state.prevScrollPos < currScrollPos && this.state.qTop + qHeight < end) {
      console.log('down');
      const qPages = this.props.qPages.map(qPage => ({ ...qPage, qTop: start }));
      this.props.setPages(qPages);
      this.setState({ qTop: start, start: start - qTop });
    } else if (this.state.prevScrollPos > currScrollPos && this.state.qTop > start) {
      console.log('up');
      const qPages = this.props.qPages.map(qPage => ({ ...qPage, qTop: end - qHeight }));
      this.props.setPages(qPages);
      this.setState({ qTop: end - qHeight, start: end - qHeight });
    } else {
      console.log('else');
      this.setState({ start });
    }

    this.setState({ prevScrollPos: currScrollPos, translateY: currScrollPos });
  }

  render() {
    const qMatrix = this.props.qMatrix.slice(this.state.start);
    return (
      <div
        style={{
          position: 'relative',
          width: '200px',
          height: `${this.props.viewportHeight}px`,
          overflowY: 'auto',
        }}
        onScroll={this.handleScroll}
      >
        <div
          style={{
            transform: `translateY(${this.state.translateY}px)`,
            width: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
            position: 'absolute',
          }}
        >
          {this.props.render({ ...this.props.renderProps, qMatrix })}
        </div>
        <div style={{ height: `${Math.max(0, this.props.virtualRowHeight * this.props.qSize.qcy)}px` }} />
      </div>
    );
  }
}
