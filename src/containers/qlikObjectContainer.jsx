import React from 'react';
import PropTypes from 'prop-types';
import resolve from '../hocs/resolve';

async function getSessionObject(qDoc, qProp) {
  const qObject = await qDoc.createSessionObject(qProp);
  return { qObject };
}

class QlikObjectContainer extends React.Component {
  static propTypes = {
    qDoc: PropTypes.object.isRequired,
    qProp: PropTypes.object.isRequired,
    qObject: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired,
  };

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

export default resolve(QlikObjectContainer, props => getSessionObject(props.qDoc, props.qProp));
