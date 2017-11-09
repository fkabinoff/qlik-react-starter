// import React from 'react';

// async function getSessionObject(qDoc, qProp) {
//   const sessionObject = await qDoc.createSessionObject(qProp);
//   return sessionObject;
// }

// export default class RootContainer extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       qSessionObject: getSessionObject(this.props.qDoc, this.props.qProp),
//     };
//   }

//   // componentWillMount() {
//   //   session.open().then((global) => {
//   //     global.openDoc('45841fc2-ae9c-490c-9bc4-55592fc62afb').then((doc) => {
//   //       this.setState({ qDoc: doc });
//   //     });
//   //   });
//   // }

//   render() {
//     return (
//       <Root qDoc={this.state.qDoc} />
//     );
//   }
// }
