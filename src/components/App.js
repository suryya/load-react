import React from 'react';
import Loadable from 'react-loadable';
//import YeomanImage from './YeomanImage';

import './app.css';

function Loading(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <div>Loading...</div>;
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}

const LoadableComponentYeomanImage = Loadable({
  loader: () => import('./YeomanImage'),
  loading: Loading,
});

class AppComponent extends React.Component {

  render() {
    return (
      <div className="index">
        <LoadableComponentYeomanImage />
        <div className="notice">
          Please edit <code>src/components/App.js</code> to get started!
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

/* YeomanImage from './YeomanImage';*/

export default AppComponent;
