import React, { Component } from 'react'
import Drizzle, { DrizzleSettings } from 'react-drizzle'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      test: 'Some basic content.',
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ test: 'Updates to content' })
    }, 2500)
  }
  render() {
    return (
      <div>
        {this.state.test}
        <section style={{ height: '1000px' }}>
          <DrizzleSettings speed={4}>
            <Drizzle type="text" group="my-group-namespace">
              <h1>
                Text you<br></br> want to<br></br>Animate
              </h1>
            </Drizzle>
            <Drizzle type="text" group="my-group-namespace">
              <h2>
                Text you<br></br> want to<br></br>Animate
              </h2>
            </Drizzle>

            <Drizzle type="fade-up" group="my-group-namespace">
              {/* it will wait to load image before revealing the group */}
              <img
                width="130"
                height="auto"
                src="https://images.unsplash.com/photo-1532264523420-881a47db012d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&   auto=format&fit=crop&w=500&q=100"
              ></img>
            </Drizzle>
          </DrizzleSettings>
        </section>
      </div>
    )
  }
}
