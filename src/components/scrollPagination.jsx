import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

const scrollPagination = Component => class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mock: true,
    };
  }

  render() {
    return (
      <div style={{ height: '100px', overflowY: 'auto', display: this.state.mock ? null : 'hidden' }}>
        <div style={{ height: '100%', overflowY: 'hidden' }}>
          <Component {...this.props} />
        </div>
      </div>
    );
  }
};

export default scrollPagination;
