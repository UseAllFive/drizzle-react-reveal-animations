import { Box } from 'rebass'
import PropTypes from 'prop-types'
import { aniController } from './ani-controller'
import { TextAppear } from './text-appear'
import React, { Component, useContext } from 'react'
import { DrizzleContext } from './drizzle-context'
import { DrizzleSettings } from './drizzle-settings'
import { drizzleName } from './drizzle-name'
import { FadeAppear } from './fade-appear'
import { ZoomAppear } from './zoom-appear'
import { WipeAppear } from './wipe-appear'

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
        rootMargin: `${this.props.visibilityRootMargin || this.context.visibilityRootMargin}px`,
        threshold: this.props.visibilityThreshold || this.context.visibilityThreshold,
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
        this.props.onAppear()
      }
    )
  }

  render() {
    return (
      <Box
        sx={{
          display: 'block',
          height: '100%',
          width: '100%',
          opacity: this.state.showing ? 1 : 0,
          position: this.props.position,

          '@-moz-document url-prefix()': {
            height: 'auto',
          },

          ...this.props.containerSx,
        }}
        style={this.props.containerStyle}
        ref={this.groupRef}
      >
        <AniType
          speed={this.props.speed || this.context.speed}
          delay={this.props.delay || this.context.delay}
          position={this.props.position}
          display={this.props.display}
          ease={this.props.ease || this.context.ease}
          type={this.props.type}
          distance={this.props.distance || this.context.distance}
          showing={this.state.showing}
          sx={this.props.sx}
          style={this.props.style}
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
          position={props.position}
          display={props.display}
          ease={props.ease}
          showing={props.showing}
          sx={props.sx}
          style={props.style}
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
          position={props.position}
          speed={props.speed}
          showing={props.showing}
          style={props.style}
          sx={props.sx}
        >
          {props.children}
        </TextAppear>
      )
      break
    case 'zoom':
      el = (
        <ZoomAppear
          speed={props.speed}
          distance={props.distance}
          delay={props.delay}
          direction={direction}
          position={props.position}
          display={props.display}
          ease={props.ease}
          showing={props.showing}
          style={props.style}
          sx={props.sx}
        >
          {props.children}
        </ZoomAppear>
      )
      break
    case 'wipe':
      el = (
        <WipeAppear
          speed={props.speed}
          distance={props.distance}
          delay={props.delay}
          position={props.position}
          display={props.display}
          direction={direction}
          ease={props.ease}
          showing={props.showing}
          style={props.style}
          sx={props.sx}
        >
          {props.children}
        </WipeAppear>
      )
      break
  }
  return el
}

Drizzle.defaultProps = {
  order: NaN,
  type: '',
  position: 'relative',
  display: 'inline-block',
  onAppear: () => {},
}

Drizzle.propTypes = {
  order: PropTypes.number,
  group: PropTypes.string,
  speed: PropTypes.number,
  delay: PropTypes.number,
  distance: PropTypes.number,
  type: PropTypes.string,
  ease: PropTypes.string,
  onAppear: PropTypes.func,
  position: PropTypes.string,
  display: PropTypes.string,
  visibilityRootMargin: PropTypes.any,
  visibilityThreshold: PropTypes.any,
  children: PropTypes.any,
  containerStyle: PropTypes.object,
  containerSx: PropTypes.object,
  sx: PropTypes.object,
  style: PropTypes.object,
}

export { DrizzleContext, DrizzleSettings, drizzleName }
