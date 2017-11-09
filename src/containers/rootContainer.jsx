import React from 'react';
import resolve from '../hocs/resolve';
import Root from '../components/root';

const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const url = SenseUtilities.buildUrl({
  host: 'usrad-fka001.qliktech.com',
  prefix: '',
});

const session = enigma.create({ schema, url });

async function getDoc() {
  const global = await session.open();
  const qDoc = await global.openDoc('c7a1d0bb-f4e9-460e-9ab1-e205c18954b2');
  return { qDoc };
}

class RootContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Root qDoc={this.props.qDoc} />
    );
  }
}

export default resolve(RootContainer, () => getDoc());
