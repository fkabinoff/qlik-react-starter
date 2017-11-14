import React from 'react';
import PropTypes from 'prop-types';
import qDocPromise from '../qDoc';

class QlikObjectContainer extends React.Component {
  static propTypes = {
    qProp: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired,
  };

  static async getSessionObject(qDoc, qProp) {
    const qObject = await qDoc.createSessionObject(qProp);
    return { qObject };
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      layout: {},
      data: {},
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

  update() {
    this.getLayout();
    this.getData();
  }

  async getLayout() {
    const qObject = await this.qObjectPromise();
    const layout = await qObject.getLayout();
    this.setState({ layout });
  }

  async getData() {
    const qObject = await this.qObjectPromise();
    const data = await qObject.getHyperCubeData('/qHyperCubeDef', this.state.qPages);
    this.setState({ data });
  }

  applyPatches(patches) {
    this.props.qObject.applyPatches(patches);
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
