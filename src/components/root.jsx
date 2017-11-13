import React from 'react';
import QlikObject from '../containers/qlikObjectContainer';

const root = props => (
  <div>
    <div>Root</div>
    <QlikObject qDoc={props.qDoc} qProp={{}} render={() => <div>HyperCube</div>} />
  </div>
);

export default root;
