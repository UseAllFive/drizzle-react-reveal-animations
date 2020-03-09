import { Box } from 'rebass'
import PropTypes from 'prop-types'
import { aniController } from './ani-controller'
import { TextAppear } from './text-appear'
import React, { Component } from 'react'

export class Drizzle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showing: false,
      onScreen: false,
      childId: Math.floor(Math.random() * 100000000000),
    }
    this.groupRef = React.createRef()
    this.isServerSide = typeof document === 'undefined' || typeof window === 'undefined'
  }

  componentDidMount() {
    // if we're rendering this component server-side, show it
    if (this.isServerSide) {
      this.setState({ showing: true })
      return
    }

    // We want to pause the reveal of the entire group
    // while we wait for the images to load
    const images = ('img', this.groupRef.current.querySelectorAll('img'))
    if (images) {
      images.forEach((img) => {
        aniController.addImagesToLoad(this.props.group, img.getAttribute('src'))
      })
    }

    this.observer = new window.IntersectionObserver(
      ([entry]) => {
        this.setState({ onScreen: entry.isIntersecting })
      },
      {
        rootMargin: '0px',
        threshold: [0, 1],
      }
    )
    this.observer.observe(this.groupRef.current)
    this.check()
  }

  componentDidUpdate() {
    this.check()
  }

  componentWillUnmount() {
    this.cleanup()
  }

  cleanup() {
    if (this.observer && this.groupRef && this.groupRef.current) {
      this.observer.unobserve(this.groupRef.current)
    }
    aniController.cleanup(this.props.group, this.state.childId)
  }

  check() {
    if (this.isServerSide || this.state.showing) return
    aniController.check(
      {
        name: this.props.group,
        visible: this.state.onScreen,
        order: this.props.order,
        childId: this.state.childId,
        done: this.state.showing,
      },
      () => {
        this.setState({ showing: true })
        this.cleanup()
      }
    )
  }

  render() {
    return (
      <span ref={this.groupRef}>
        <AniType type={this.props.type} showing={this.state.showing}>
          {this.state.counter}
          {this.props.children}
        </AniType>
      </span>
    )
  }
}

export function AniType(props) {
  let el = <div>{props.children}</div>
  switch (props.type) {
    case 'fade':
      el = <Fade showing={props.showing}>{props.children}</Fade>
      break
    case 'fade-down':
      el = (
        <Fade direction="down" showing={props.showing}>
          {props.children}
        </Fade>
      )
      break
    case 'fade-up':
      el = (
        <Fade direction="up" showing={props.showing}>
          {props.children}
        </Fade>
      )
      break
    case 'text':
      el = <TextAppear showing={props.showing}>{props.children}</TextAppear>
      break
  }
  return el
}

export function Fade(props) {
  let movement = 'translate(0, 0)'
  if (props.direction === 'up') {
    movement = 'translate(0, 25px)'
  } else if (props.direction === 'down') {
    movement = 'translate(0, -25px)'
  } else if (props.direction === 'left') {
    movement = 'translate(-25px, 0)'
  } else if (props.direction === 'right') {
    movement = 'translate(25px, 0)'
  }
  const delay = props.delay ? props.delay : 0
  return (
    <span
      style={{
        opacity: props.showing ? 1 : 0,
        display: 'block',
        transform: props.showing ? 'translate(0, 0)' : movement,
        transition: `all 0.6s ease-out ${delay}s`,
      }}
    >
      {props.children}
    </span>
  )
}

Drizzle.defaultProps = {
  order: NaN,
  type: 'fade-up',
}

Drizzle.propTypes = {
  order: PropTypes.number,
  group: PropTypes.string,
  type: PropTypes.string,
  onAppear: PropTypes.func,
}
