import * as React from 'react';

import { CssBaseline } from '@material-ui/core';
import Sheet from './Sheet';

export class App extends React.Component {

  public render() {
    return (

      <React.Fragment>
        <CssBaseline />
        <div>
          <p className='title'>Sheet</p>
          <main>
            <Sheet />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
