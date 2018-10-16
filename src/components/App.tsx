import * as React from 'react';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Sheet from './Sheet';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});


export class App extends React.Component {

  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <main>
            <Sheet />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
