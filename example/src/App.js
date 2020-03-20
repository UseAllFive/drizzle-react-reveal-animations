import React, { Component } from 'react'
import Drizzle, { DrizzleSettings } from 'react-drizzle'
import Grid from './Grid'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      test: 'Some basic content.',
      showManualItem: false,
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ test: 'Updates with content' })
    }, 2500)
  }
  render() {
    return (
      <div>
        <Drizzle type="wipe" group="img">
          <img
            src="https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2091&q=80"
            height="200"
            width="auto"
          ></img>
        </Drizzle>

        <div
          style={{
            width: '700px',
            height: '700px',
            position: 'relative',
          }}
        >
          <Drizzle type="wipe" speed={3} position="absolute" group="img">
            <img
              src="https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2091&q=80"
              height="200"
              width="auto"
              style={{
                position: 'absolute',
                top: '45px',
                left: '145px',
              }}
            ></img>
          </Drizzle>
          <Drizzle type="zoom" position="absolute" group="img">
            <img
              src="https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2091&q=80"
              height="200"
              width="auto"
              style={{
                position: 'absolute',
                bottom: '45px',
                left: '45px',
              }}
            ></img>
          </Drizzle>
        </div>
        <Grid></Grid>
        {this.state.test}
      </div>
    )
  }
}
