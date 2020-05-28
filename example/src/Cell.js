import Drizzle, { DrizzleSettings, drizzleName } from 'react-drizzle'
import React, { Component } from 'react'

export default class Grid extends Component {
  constructor() {
    super()
    this.state = { groupName: drizzleName.create() }
  }
  render() {
    return (
      <Drizzle
        group={this.state.groupName}
        type="fade-down"
        distance={100}
        delay={0}
        order={1}
        speed={1}
      >
        <div className="block">
          <DrizzleSettings delay={0.5} staggerSpeed={0.3}>
            <Drizzle group={this.state.groupName} order={2} type="text">
              <h1>
                My title<br></br>Next <strong>Line</strong> goes here
              </h1>
            </Drizzle>

            <Drizzle group={this.state.groupName} order={3} type="text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </Drizzle>
            <Drizzle group={this.state.groupName} order={4} type="fade">
              <img
                src="https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2091&q=80"
                height="100"
                width="auto"
              ></img>
            </Drizzle>
          </DrizzleSettings>
        </div>
      </Drizzle>
    )
  }
}
