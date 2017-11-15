let qProps = {};

qProps.testList = {
  qInfo: {
    qType: 'visualization'
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: [this.props.field]
    },
    qShowAlternatives: true,
    qAutoSortByState: { qDisplayNumberOfRows: 1}
  }
}