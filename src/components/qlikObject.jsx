import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import qDocPromise from '../qDoc';

const settings = {
  hypercube: {
    path: '/qHyperCubeDef',
    dataFunc: 'getHyperCubeData',
  },
  list: {
    path: '/qListObjectDef',
    dataFunc: 'getListObjectData',
  },
  expression: {
    path: null,
    dataFunc: null,
  },
};

export default class QlikObjectContainer extends React.Component {
  static propTypes = {
    qProp: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['hypercube', 'list', 'expression']).isRequired,
    qPages: PropTypes.object,
    render: PropTypes.func.isRequired,
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
      error: false,
      layout: {},
      data: {},
      qPages: this.props.qPages,
    };
  }

  async componentWillMount() {
    this.setState({ loading: true, error: false });
    try {
      const qDoc = await qDocPromise();
      this.qObjectPromise = qDoc.createSessionObject(this.props.qProp);
      const qObject = await this.qObjectPromise();
      qObject.on('changed', () => { this.update(); });
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
    const qObject = await this.qObjectPromise();
    const layout = await qObject.getLayout();
    this.setState({ layout });
  }

  async getData() {
    const qObject = await this.qObjectPromise();
    const data = await qObject[this.settings.dataFunc](this.settings.path, this.state.qPages);
    this.setState({ data });
  }

  async update() {
    this.setState({ loading: true, error: false });
    try {
      await this.getLayout();
      await this.getData();
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  @autobind
  async beginSelections() {
    const qObject = await this.qObjectPromise();
    qObject.beginSelections(this.settings.path);
  }

  @autobind
  async endSelections(qAccept) {
    const qObject = await this.qObjectPromise();
    qObject.endSelections(qAccept);
  }

  @autobind
  async applyPatches(patches) {
    const qObject = await this.qObjectPromise();
    qObject.applyPatches(patches);
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (this.state.error) {
      return <div>{this.state.error.message}</div>;
    }
    return this.props.render(this.state);
  }
}
