import React, { Component } from 'react'
import { Drizzle } from 'react-drizzle'

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
          <Drizzle type="fade-up" group="test">
            <p>
              {this.state.test}
              {/* it will wait to load image before revealing the group */}
              <img
                width="130"
                height="auto"
                src="https://images.unsplash.com/photo-1532264523420-881a47db012d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=100"
              ></img>
            </p>
          </Drizzle>
          <Drizzle type="text" group="test">
            <h3>
              Text you<br></br> want to animate<br></br> and want to test<br></br> and want to<br></br>Animate<br></br>
              {this.state.test}
            </h3>
          </Drizzle>
        </section>
      </div>
    )
  }
}
