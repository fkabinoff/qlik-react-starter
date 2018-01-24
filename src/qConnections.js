const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const config = {
  host: 'sense-demo.qlik.com',
  secure: true,
  port: 443,
  prefix: '/',
  appId: '372cbc85-f7fb-4db6-a620-9a5367845dce',
};

async function qDocAsync() {
  const url = SenseUtilities.buildUrl(config);
  const session = enigma.create({ schema, url });
  const global = await session.open();
  const qDoc = await global.openDoc(config.appId);
  return qDoc;
}

async function qAppAsync() {
  window.require.config({
    baseUrl: `${(config.secure ? 'https://' : 'http://') + config.host + (config.port ? `:${config.port}` : '') + config.prefix}resources`,
    paths: {
      qlik: `${(config.secure ? 'https://' : 'http://') + config.host + (config.port ? `:${config.port}` : '') + config.prefix}resources/js/qlik`,
    },
  });
  return new Promise((resolve) => {
    window.require(['js/qlik'], (qlik) => {
      const app = qlik.openApp(config.appId, { ...config, isSecure: config.secure });
      resolve(app);
    });
  });
}

const qDocPromise = qDocAsync();
const qAppPromise = qAppAsync();
export { qDocPromise };
export { qAppPromise };
export default { qDocPromise, qAppPromise };
