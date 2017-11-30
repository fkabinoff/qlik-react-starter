import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Table } from 'reactstrap';
import QlikPageScroll from './QlikPageScroll';

export default class QlikTable extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    layout: PropTypes.object.isRequired,
    qPages: PropTypes.array.isRequired,
    setPages: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    applyPatches: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      sortColumn: 0,
    };
  }

  @autobind
  async setSortColumn(event) {
    const index = Number(event.target.dataset.index);
    await this.props.applyPatches([{
      qOp: 'replace',
      qPath: '/qHyperCubeDef/qInterColumnSortOrder',
      qValue: JSON.stringify([index]),
    }]);
    this.setState({ sortColumn: index });
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
      <QlikPageScroll
        qSize={this.props.layout.qHyperCube.qSize}
        qPages={this.props.qPages}
        setPages={this.props.setPages}
        viewportHeight={400}
      >
        <Table responsive>
          <thead>
            <tr>
              {labels.map((label, index) => (
                <th
                  className={index === this.state.sortColumn ? 'active' : null}
                  key={label}
                  data-index={index}
                  onClick={this.setSortColumn}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data[0].qMatrix.map(row => (
              <tr
                key={row.reduce((a, b) => (
                  a.qElemNumber.toString().concat(b.qElemNumber.toString())))}
              >
                {row.map(col => (
                  <td key={col.qText}>{col.qText}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </QlikPageScroll>
    );
  }
}

