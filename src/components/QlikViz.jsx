import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { qAppPromise } from '../qConnections';

export default class QlikViz extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.oneOf(['barchart', 'boxplot', 'combochart', 'distributionplot', 'gauge', 'histogram', 'kpi', 'linechart', 'piechart', 'pivot-table', 'scatterplot', 'table', 'treemap', 'extension']),
    cols: PropTypes.array,
    options: PropTypes.object,
  }

  static defaultProps = {
    id: null,
    type: '',
    cols: [],
    options: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
    };
  }

  async componentWillMount() {
    this.setState({ loading: true, error: null });
    try {
      const { id, type, cols, options } = this.props;
      const qApp = await qAppPromise;
      this.qVizPromise = id ? await qApp.visualization.get(id) : await qApp.visualization.create(type, cols, options);
    } catch(error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const qViz = await qVizPromise;
    qViz.show(this.node);
  }

  async componentWillUnmount() {
    const qViz = await qVizPromise;
    qViz.close();
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error.message}</div>;
    } else if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return <div ref={(node) => { this.node = node; }} />
  }
}
