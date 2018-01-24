const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const config = {
  host: 'sense-demo.qlik.com',
  secure: true,
  prefix: '',
  appId: '372cbc85-f7fb-4db6-a620-9a5367845dce',
};

const url = SenseUtilities.buildUrl(config);

const session = enigma.create({ schema, url });

async function qDocAsync() {
  const global = await session.open();
  const qDoc = await global.openDoc(config.appId);
  return qDoc;
}

export default qDocAsync();
