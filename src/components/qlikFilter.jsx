import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import QlikVirtualScroll from './QlikVirtualScroll';

const DropdownItemList = props => (
  <span>
    {props.qMatrix.map(row =>
      (
        <DropdownItem
          className={`border border-light border-left-0 border-right-0 ${row[0].qState}`}
          key={row[0].qElemNumber}
          data-q-elem-number={row[0].qElemNumber}
          toggle={false}
          onClick={props.select}
        >
          {row[0].qText}
        </DropdownItem>
      ))}
  </span>
);
DropdownItemList.propTypes = {
  qMatrix: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
};

const StateCountsBar = (props) => {
  const stateCounts = props.layout.qDimensionInfo.qStateCounts;
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

export default class QlikFilter extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    offset: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    beginSelections: PropTypes.func.isRequired,
    endSelections: PropTypes.func.isRequired,
    searchListObjectFor: PropTypes.func.isRequired,
    acceptListObjectSearch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      searchListInputValue: '',
    };
  }

  @autobind
  toggle() {
    this.props.offset(0);

    if (!this.state.dropdownOpen) {
      this.props.beginSelections();
    }
    if (this.state.dropdownOpen) {
      this.props.endSelections(true);
    }

    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  @autobind
  select(e) {
    this.props.select(Number(e.target.dataset.qElemNumber));
  }

  @autobind
  searchListObjectFor(event) {
    this.setState({ searchListInputValue: event.target.value });
    this.props.searchListObjectFor(event.target.value);
  }

  @autobind
  acceptListObjectSearch(event) {
    if (event.charCode === 13) {
      this.setState({ searchListInputValue: '' });
      this.props.acceptListObjectSearch();
    }
  }

  render() {
    return (
      <Dropdown className="d-inline-block" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Dropdown
        </DropdownToggle>
        <DropdownMenu>
          <Input
            value={this.state.searchListInputValue}
            onChange={this.searchListObjectFor}
            onKeyPress={this.acceptListObjectSearch}
          />
          <QlikVirtualScroll
            qData={this.props.qData}
            qLayout={this.props.qLayout}
            Component={DropdownItemList}
            componentProps={{ select: this.select }}
            offset={this.props.offset}
            rowHeight={34}
            viewportHeight={170}
          />
        </DropdownMenu>
        <StateCountsBar layout={this.props.qLayout} />
      </Dropdown>
    );
  }
}
