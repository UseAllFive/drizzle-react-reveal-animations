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
        <Grid></Grid>
        {this.state.test}
      </div>
    )
  }
}
