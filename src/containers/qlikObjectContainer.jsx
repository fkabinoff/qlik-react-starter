import React from 'react';
import resolve from '../hocs/resolve';

async function getSessionObject(qDoc, qProp) {
  const qObject = await qDoc.createSessionObject(qProp);
  return { qObject };
}

class HyperCubeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      this.props.render(this.state)
    );
  }
}

export default resolve(HyperCubeContainer, props => getSessionObject(props.qDoc, props.qProp));
