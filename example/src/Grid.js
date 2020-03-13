import React, { Component } from 'react'
import Drizzle, { DrizzleSettings } from 'react-drizzle'
import styles from './index.css'
import Cell from './Cell'

export default class Grid extends Component {
  constructor() {
    super()
    this.state = {
      count: 12,
    }
  }
  addCell() {
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    const cells = []
    for (let i = 0; i < this.state.count; i++) {
      cells.push(<Cell key={i}></Cell>)
    }
    return (
      <div>
        <button
          onClick={() => {
            this.addCell()
          }}
        >
          Add Cell
        </button>

        <div className="container">{cells}</div>
      </div>
    )
  }
}
