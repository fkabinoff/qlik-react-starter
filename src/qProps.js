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
        qSortCriterias: [{ qSortByAscii: 1 }],
      },
    }],
    qMeasures: [{
      qDef: {
        qDef: 'Sum([Sales Amount])',
        qNumFormat: {
          qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        },
      },
      qSortBy: { qSortByNumeric: -1 },
    }],
  },
};

export default qProps;
