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
      <Dropdown className="d-inline-block" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
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
    <DropdownItem
      className={`border border-light border-left-0 border-right-0 ${props.item.qState}`}
      onClick={handleClick}
    >{props.item.qText}
    </DropdownItem>
  );
};
FilterItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

const StateCountsBar = (props) => {
  const stateCounts = props.layout.qListObject.qDimensionInfo.qStateCounts;
  const totalStateCounts = Object.values(stateCounts).reduce((a, b) => a + b);
  const fillWidth = `${((stateCounts.qOption + stateCounts.qSelected) * 100) / totalStateCounts}%`;
  const barStyle = { position: 'relative', height: '0.25rem' };
  const fillStyle = {
    position: 'absolute', width: fillWidth, height: '100%', transition: 'width .6s ease',
  };
  return (
    <div className="bg-qalternative" style={barStyle}>
      <div className="bg-qselected" style={fillStyle} />
    </div>
  );
};
StateCountsBar.propTypes = {
  layout: PropTypes.object.isRequired,
};
