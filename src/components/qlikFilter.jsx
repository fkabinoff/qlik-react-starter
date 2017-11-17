import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import qlikObject from './qlikObject';

@qlikObject
export default class qlikFilter extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    layout: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,
  }

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
          {this.props.data[0].qMatrix.map(row =>
            (<FilterItem
              key={row[0].qElemNumber}
              item={row[0]}
              onItemClick={this.props.select}
            />))}
        </DropdownMenu>
        <StateCountsBar layout={this.props.layout} />
      </Dropdown>
    );
  }
}

const FilterItem = (props) => {
  const handleClick = () => {
    props.onItemClick(props.item.qElemNumber);
  };
  return (
    <DropdownItem onClick={handleClick}>{props.item.qText}</DropdownItem>
  );
};
FilterItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

const StateCountsBar = props => (
  <div stuff={props.layout}>StateCounts</div>
);
StateCountsBar.propTypes = {
  layout: PropTypes.object.isRequired,
};
