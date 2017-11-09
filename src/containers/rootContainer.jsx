import React from 'react';
import Root from '../components/root';

const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const url = SenseUtilities.buildUrl({
  host: 'usrad-fka001.qliktech.com',
  prefix: '',
});

const session = enigma.create({ schema, url });

async function getDoc(id) {
  const global = await session.open();
  const qDoc = await global.openDoc(id);
  return qDoc;
}

export default class RootContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      qDoc: getDoc('c7a1d0bb-f4e9-460e-9ab1-e205c18954b2'),
    };
  }

  // componentWillMount() {
  //   session.open().then((global) => {
  //     global.openDoc('45841fc2-ae9c-490c-9bc4-55592fc62afb').then((doc) => {
  //       this.setState({ qDoc: doc });
  //     });
  //   });
  // }

  render() {
    return (
      <Root qDoc={this.state.qDoc} />
    );
  }
}
