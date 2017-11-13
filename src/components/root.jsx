import React from 'react';
import PropTypes from 'prop-types';
import QlikObject from '../containers/qlikObjectContainer';

const root = props => (
  <div>
    <div>Root</div>
    <QlikObject qDoc={props.qDoc} qProp={{}} render={() => <div>HyperCube</div>} />
  </div>
);

root.propTypes = {
  qDoc: PropTypes.object.isRequired,
};

export default root;
