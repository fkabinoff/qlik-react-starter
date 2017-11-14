const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const url = SenseUtilities.buildUrl({
  host: 'usrad-fka001.qliktech.com',
  prefix: '',
});

const session = enigma.create({ schema, url });

export default async function () {
  const global = await session.open();
  const qDoc = await global.openDoc('c7a1d0bb-f4e9-460e-9ab1-e205c18954b2');
  return qDoc;
}
