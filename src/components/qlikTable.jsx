import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Table } from 'reactstrap';
import qlikObject from './qlikObject';
import qlikPageScroll from './qlikPageScroll';

export default qlikObject(qlikPageScroll(class qlikTable extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    layout: PropTypes.object.isRequired,
    qPages: PropTypes.array.isRequired,
    qSize: PropTypes.object.isRequired,
    setPages: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    beginSelections: PropTypes.func.isRequired,
    endSelections: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      sortColumn: 0,
    };

    console.log(this.props);
  }

  @autobind
  select(e) {
    this.props.select(Number(e.target.dataset.qElemNumber));
  }

  render() {
    const labels = [
      ...this.props.layout.qHyperCube.qDimensionInfo.map(dim => dim.qFallbackTitle),
      ...this.props.layout.qHyperCube.qMeasureInfo.map(measure => measure.qFallbackTitle),
    ];
    return (
      <Table responsive>
        <thead>
          <tr>
            {labels.map(label => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.data[0].qMatrix.map(row => (
            <tr key={row.reduce((a, b) => a.qElemNumber.toString().concat(b.qElemNumber.toString()))}>
              {row.map(col => (
                <td key={col.qText}>{col.qText}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}));

