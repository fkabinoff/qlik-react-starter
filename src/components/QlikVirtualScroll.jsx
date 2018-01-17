import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

export default class QlikVirtualScroll extends React.Component {
  static propTypes = {
    qData: PropTypes.array.isRequired,
    qLayout: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired,
    renderProps: PropTypes.object,
    setPage: PropTypes.func.isRequired,
    rowHeight: PropTypes.number,
    viewportHeight: PropTypes.number,
  }

  static defaultProps = {
    renderProps: {},
    rowHeight: 40,
    viewportHeight: 200,
  }

  constructor(props) {
    super(props);

    this.state = {
      start: 0,
      end: this.props.viewportHeight / this.props.rowHeight,
      translateY: 0,
    };
  }

  @autobind
  handleScroll(event) {
    const scrollTop = event.target.scrollTop;
    const {
      qData, qLayout, viewportHeight, rowHeight,
    } = this.props;

    const numOfViewportItems = viewportHeight / rowHeight;
    const start = scrollTop / rowHeight;
    const end = start + numOfViewportItems;
    const translateY = rowHeight * start;

    if (qData.qArea.qTop > start) {
      const qTop = Math.max(0, start - qData.qArea.qHeight + numOfViewportItems);
      const qPage = { ...qData.qArea, qTop };
      this.props.setPage(qPage);
    } else if (qData.qArea.qTop + qData.qArea.qHeight < end) {
      const qTop = start;
      const qPage = { ...qData.qArea, qTop };
      this.props.setPage(qPage);
    }
    this.setState({ start, end, translateY });
  }

  render() {
    const { start, end, translateY } = this.state;
    const {
      qData, qLayout, viewportHeight, rowHeight, renderProps,
    } = this.props;
    const qMatrix = qData.qMatrix.slice(start - qData.qArea.qTop, end - qData.qArea.qTop);
    return (
      <div
        style={{
          position: 'relative',
          width: '200px',
          height: `${viewportHeight}px`,
          overflowY: 'auto',
        }}
        onScroll={this.handleScroll}
      >
        <div
          style={{
            transform: `translateY(${translateY}px)`,
            width: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
            position: 'absolute',
          }}
        >
          {this.props.render({ ...renderProps, qMatrix })}
        </div>
        <div style={{ height: `${rowHeight * qLayout.qSize.qcy}px` }} />
      </div>
    );
  }
}
