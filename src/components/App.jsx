import React from 'react';
import QlikObject from './QlikObject';
import QlikFilter from './QlikFilter';
import QlikTable from './QlikTable';
import qDocPromise from '../qDoc';
import qProps from '../qProps';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
    };
  }

  async componentWillMount() {
    this.setState({ loading: true, error: false });
    try {
      await qDocPromise;
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (this.state.error) {
      return <div>{this.state.error.message}</div>;
    }
    return (
      <div className="container">
        <section className="my-3">
          <QlikObject qProp={qProps.testList} type="qListObject" Component={QlikFilter} />
        </section>
        <section className="my-3">
          <QlikObject qProp={qProps.testCube} type="qHyperCube" Component={QlikTable} componentProps={{ columnWidths: [50, 50] }} />
        </section>
      </div>
    );
  }
}
