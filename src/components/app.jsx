import React from 'react';
import QlikObject from './qlikObject';
import QlikFilter from './qlikFilter';
import QlikTable from './qlikTable';
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
      <div>
        <QlikObject qProp={qProps.testList} type="qListObject" Component={QlikFilter} />
        <QlikObject qProp={qProps.testCube} type="qHyperCube" Component={QlikTable} />
      </div>
    );
  }
}
