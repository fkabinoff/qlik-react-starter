const qProps = {};

qProps.testList = {
  qInfo: {
    qType: 'visualization',
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['Product Group Desc'],
    },
    qShowAlternatives: true,
    qAutoSortByState: { qDisplayNumberOfRows: 1 },
  },
};

qProps.testCube = {
  qInfo: {
    qType: 'visualization',
  },
  qHyperCubeDef: {
    qDimensions: [{
      qDef: {
        qFieldDefs: ['Product Group Desc'],
      },
    }],
    qMeasures: [{
      qDef: {
        qDef: 'Sum(Sales)',
      },
    }],
  },
};

export default qProps;
