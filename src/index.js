import { Box } from 'rebass'
import PropTypes from 'prop-types'
import { aniController } from './ani-controller'
import { TextAppear } from './text-appear'
import React, { Component, useContext } from 'react'
import { DrizzleContext } from './drizzle-context'
import { DrizzleSettings } from './drizzle-settings'
import { FadeAppear } from './fade-appear'

export default class Drizzle extends Component {
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
    if (this.isServerSide && !this.showing) {
      this.setState({ showing: true })
      return
    }

    // We want to pause the reveal of the entire group
    // while we wait for the images to load
    const images = ('img', this.groupRef.current.querySelectorAll('img'))
    if (images && this.context.waitForChildImages) {
      images.forEach((img) => {
        aniController.addImagesToLoad(this.props.group, img.getAttribute('src'))
      })
    } else {
      console.log('skipping images')
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
        context: this.context,
      },
      () => {
        this.setState({ showing: true })
        this.cleanup()
      }
    )
  }

  render() {
    return (
      <Box sx={{ display: 'block', height: '100%', width: '100%', position: 'relative' }} ref={this.groupRef}>
        <AniType
          speed={this.props.speed || this.context.speed}
          delay={this.props.delay || this.context.delay}
          ease={this.props.ease || this.context.ease}
          type={this.props.type}
          distance={this.props.distance || this.context.distance}
          showing={this.state.showing}
        >
          {this.props.children}
        </AniType>
      </Box>
    )
  }
}

Drizzle.contextType = DrizzleContext

export function AniType(props) {
  let el = <div>{props.children}</div>

  let fullTypeName = props.type
  let direction = null
  let type
  if (fullTypeName.indexOf('-') > -1) {
    ;[type, direction] = fullTypeName.split('-')
  } else {
    type = fullTypeName
  }

  switch (type) {
    case 'fade':
      el = (
        <FadeAppear
          speed={props.speed}
          distance={props.distance}
          delay={props.delay}
          direction={direction}
          ease={props.ease}
          showing={props.showing}
        >
          {props.children}
        </FadeAppear>
      )
      break
    case 'text':
      el = (
        <TextAppear
          ease={props.ease}
          distance={props.distance}
          delay={props.delay}
          speed={props.speed}
          showing={props.showing}
        >
          {props.children}
        </TextAppear>
      )
      break
  }
  return el
}

Drizzle.defaultProps = {
  order: NaN,
  type: 'fade-up',
}

Drizzle.propTypes = {
  order: PropTypes.number,
  group: PropTypes.string,
  speed: PropTypes.number,
  delay: PropTypes.number,
  distance: PropTypes.distance,
  type: PropTypes.string,
  ease: PropTypes.string,
  onAppear: PropTypes.func,
}

export { DrizzleContext, DrizzleSettings }
