import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './containers/rootContainer';
import './styles/index.scss';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(RootContainer);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/rootContainer', () => { render(RootContainer); });
}
