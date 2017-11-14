import React from 'react';
import PropTypes from 'prop-types';
import resolve from '../hocs/resolve';

class QlikObjectContainer extends React.Component {
  static propTypes = {
    qDoc: PropTypes.object.isRequired,
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
      qObject: {},
      layout: {},
      data: {},
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    this.props.qObject.on('changed', () => { this.update(); });
  }

  update() {
    this.getLayout();
    this.getData();
  }

  async getLayout() {
    const layout = await this.props.qObject.getLayout();
    this.setState({ layout });
  }

  async getData(qPages) {
    const data = await this.props.qObject.getHyperCubeData('/qHyperCubeDef', qPages);
    this.setState({ data });
  }

  applyPatches(patches) {
    this.props.qObject.applyPatches(patches);
  }

  render() {
    return (
      this.props.render(this.state)
    );
  }
}
