import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import qDocPromise from '../qDoc';

const settings = {
  qHyperCube: {
    path: '/qHyperCubeDef',
    dataFunc: 'getHyperCubeData',
    selectFunc: 'selectHyperCubeValues',
    selectArgs: {
      path: '/qHyperCubeDef', dimIndex: 0, values: [], toggle: true,
    },
  },
  qListObject: {
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

export default class QlikObject extends React.Component {
  static propTypes = {
    qProp: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['qHyperCube', 'qListObject', 'expression']).isRequired,
    qPages: PropTypes.array,
    Component: PropTypes.func.isRequired,
  };
  static defaultProps = {
    qPages: [{
      qTop: 0,
      qLeft: 0,
      qWidth: 10,
      qHeight: 10,
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
    this.setState({ qPages }, this.getData);
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
    qObject.beginSelections([this.settings.path]);
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
  async searchListObjectFor(string) {
    const qObject = await this.qObjectPromise;
    qObject.searchListObjectFor('/qListObjectDef', string);
  }

  @autobind
  async acceptListObjectSearch() {
    const qObject = await this.qObjectPromise;
    qObject.acceptListObjectSearch('/qListObjectDef', true);
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
    const { Component } = this.props;
    return (<Component
      {...this.state}
      setPages={this.setPages}
      select={this.select}
      beginSelections={this.beginSelections}
      endSelections={this.endSelections}
      searchListObjectFor={this.searchListObjectFor}
      acceptListObjectSearch={this.acceptListObjectSearch}
    />);
  }
}
