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
    Component: PropTypes.func.isRequired,
    qPage: PropTypes.object,
  };
  static defaultProps = {
    qPage: {
      qTop: 0,
      qLeft: 0,
      qWidth: 10,
      qHeight: 10,
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      updating: false,
      error: null,
      qLayout: {},
      qData: { qArea: this.props.qPage },
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
  setPage(qPage) {
    this.update(qPage);
  }

  settings = settings[this.props.type];

  async getLayout() {
    const qObject = await this.qObjectPromise;
    const qLayout = await qObject.getLayout();
    return qLayout[this.props.type];
  }

  async getData(qPage) {
    const qObject = await this.qObjectPromise;
    const qDataPages = await qObject[this.settings.dataFunc](this.settings.path, [{ ...qPage, qHeight: this.props.qPage.qHeight }]);
    return qDataPages[0];
  }

  async update(qPage = this.state.qData.qArea) {
    this.setState({ updating: true });
    const [qLayout, qData] = await Promise.all([this.getLayout(), this.getData(qPage)]);
    this.setState({ updating: false, qLayout, qData });
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
      setPage={this.setPage}
      select={this.select}
      beginSelections={this.beginSelections}
      endSelections={this.endSelections}
      searchListObjectFor={this.searchListObjectFor}
      acceptListObjectSearch={this.acceptListObjectSearch}
      applyPatches={this.applyPatches}
    />);
  }
}
