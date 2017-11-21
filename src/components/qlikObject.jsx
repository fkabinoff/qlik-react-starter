import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import qDocPromise from '../qDoc';

const settings = {
  hypercube: {
    path: '/qHyperCubeDef',
    dataFunc: 'getHyperCubeData',
    selectFunc: 'selectHyperCubeValues',
    selectArgs: {
      path: '/qHyperCubeDef', dimIndex: 0, values: [], toggle: true,
    },
  },
  list: {
    path: '/qListObjectDef',
    dataFunc: 'getListObjectData',
    selectFunc: 'selectListObjectValues',
    selectArgs: { path: '/qListObjectDef', values: [], toggle: true },
  },
  expression: {
    path: null,
    dataFunc: null,
  },
};

const qlikObject = Component => class extends React.Component {
  static propTypes = {
    qProp: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['hypercube', 'list', 'expression']).isRequired,
    qPages: PropTypes.array,
  };
  static defaultProps = {
    qPages: [{
      qTop: 0,
      qLeft: 0,
      qWidth: 10,
      qHeight: 20,
    }],
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      layout: {},
      data: {},
      updating: false,
      qPages: this.props.qPages,
    };
  }

  async componentWillMount() {
    this.setState({ loading: true, error: null });
    try {
      const qDoc = await qDocPromise;
      this.qObjectPromise = qDoc.createSessionObject(this.props.qProp);
      const qObject = await this.qObjectPromise;
      qObject.on('changed', () => { this.update(); });
      await this.update();
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  @autobind
  setPages(qPages) {
    this.setState({ qPages });
  }

  settings = settings[this.props.type];

  async getLayout() {
    const qObject = await this.qObjectPromise;
    const layout = await qObject.getLayout();
    this.setState({ layout });
  }

  async getData() {
    const qObject = await this.qObjectPromise;
    const data = await qObject[this.settings.dataFunc](this.settings.path, this.state.qPages);
    this.setState({ data });
  }

  async update() {
    this.setState({ updating: true });
    await this.getLayout();
    await this.getData();
    this.setState({ updating: false });
  }

  @autobind
  async beginSelections() {
    const qObject = await this.qObjectPromise;
    qObject.beginSelections(this.settings.path);
  }

  @autobind
  async endSelections(qAccept) {
    const qObject = await this.qObjectPromise;
    qObject.endSelections(qAccept);
  }

  @autobind
  async select(qElemNumber) {
    const args = Object.values({ ...this.settings.selectArgs, values: [qElemNumber] });
    const qObject = await this.qObjectPromise;
    qObject[this.settings.selectFunc](...args);
  }

  @autobind
  async applyPatches(patches) {
    const qObject = await this.qObjectPromise;
    qObject.applyPatches(patches);
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error.message}</div>;
    } else if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (<Component
      {...this.state}
      setPages={this.setPages}
      select={this.select}
      beginSelections={this.beginSelections}
      endSelections={this.endSelections}
    />);
  }
};

export default qlikObject;
