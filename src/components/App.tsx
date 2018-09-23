import * as React from 'react';

import { CssBaseline } from "@material-ui/core";
import { Input } from "./controls/Input";
import { Number } from "./controls/Number";
import Typography from '@material-ui/core/Typography';

class App extends React.Component<{}, { name: string, age: number }> {
  constructor(props: {}) {
    super(props);
    this.state = { name: "王大锤", age: 18 }
  }

  public render() {
    return (

      <React.Fragment>
        <CssBaseline />
        <div>
          <main>
            <Typography>我叫 {this.state.name}，今年 {this.state.age}</Typography>
            <Input label="名字" value={this.state.name} onEdited={x => this.setState({ name: x })} />
            <Number label="年龄" value={this.state.age} onEdited={n => this.setState({ age: n })} />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
