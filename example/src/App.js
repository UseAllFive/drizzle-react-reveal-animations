import React, { Component } from 'react'
import Drizzle, { DrizzleSettings } from 'react-drizzle'

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
        {this.state.test}
        <Drizzle speed={1} type="text" group="my-group-namespace">
          <h1>
            Text you<br></br> want to<br></br>Animate<br></br>
          </h1>
        </Drizzle>

        <section style={{ height: '1000px' }}>
          <DrizzleSettings ease={'elastic.out(1, 0.3)'} speed={2}>
            <Drizzle type="text" group="my-group-namespace">
              <h1>
                Text you<br></br> want to<br></br>Animate<br></br>
                {this.state.test}
              </h1>
            </Drizzle>
          </DrizzleSettings>
        </section>
        <Drizzle type="fade-down" visibilityThreshold={[0]}>
          <img
            width="130"
            height="auto"
            src="https://images.unsplash.com/photo-1532264523420-881a47db012d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=100"
          ></img>
        </Drizzle>

        {/* Example of a custom animation */}
        <Drizzle
          onAppear={() => {
            this.setState({ showManualItem: true })
          }}
          group="fade-down"
        >
          <h1
            style={{
              transition: 'all 1s ease-in',
              transform: this.state.showManualItem ? 'translateY(0px)' : 'translateY(-10px)',
            }}
          >
            Custom Animation
          </h1>
        </Drizzle>
      </div>
    )
  }
}
