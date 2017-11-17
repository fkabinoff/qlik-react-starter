import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import qlikObject from './qlikObject';

@qlikObject
export default class qlikFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };
  }

  @autobind
  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Dropdown
        </DropdownToggle>
        <DropdownMenu>
          {this.props.data[0].qMatrix.map(row => <DropdownItem key={row[0].qElemNumber}>{row[0].qText}</DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
