import * as React from 'react';

import { CssBaseline } from '@material-ui/core';
import Sheet from './Sheet';

class App extends React.Component {

  public render() {
    return (

      <React.Fragment>
        <CssBaseline />
        <div>
          <main>
            <Sheet />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
