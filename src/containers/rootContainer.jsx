const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const url = SenseUtilities.buildUrl({
  host: 'usrad-fka001.qliktech.com',
  prefix: '',
});
const session = enigma.create({ schema, url });

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      qDoc: null
    };
  }

  componentWillMount() {
    session.open().then((global) => {
      global.openDoc('45841fc2-ae9c-490c-9bc4-55592fc62afb').then(doc => {
        this.setState({ qDoc: doc });
      });
    });
  }

  render() {
    return (
      <Root qDoc={this.state.qDoc} />
    );
  }
}