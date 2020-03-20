import { Box } from 'rebass'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TweenMax } from 'gsap'

export class WipeAppear extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasShown: false,
    }
    this.groupRef = React.createRef()
  }

  componentDidUpdate() {
    this.check()
  }

  check() {
    // if we're rendering this component server-side, show it
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      if (!this.state.hasShown) {
        this.setState({ hasShown: true })
      }
      return
    }

    if (this.props.showing && !this.state.hasShown) {
      const tweenFrom = {
        opacity: 0,
        scale: this.props.zoomScale,
      }

      // TODO: this needs to equal the children's width, not the container:
      const distance = this.groupRef.current.querySelector('.drizzle-zoom').offsetWidth || 500

      let startProps = clipPath(100)
      let endProps = clipPath(0)
      const direction = 'left'
      switch (direction) {
        case 'up':
          startProps = clipPath(distance, 0, 0, 0)
          endProps = clipPath(0, 0, 0, 0)
          break
        case 'down':
          startProps = clipPath(0, 0, distance, 0)
          endProps = clipPath(0, 0, 0, 0)
          break
        case 'left':
          startProps = clipPath(0, 0, 0, distance)
          endProps = clipPath(0, 0, 0, 0)
          break
        case 'right':
        default:
          startProps = clipPath(0, distance, 0)
          endProps = clipPath(0, 0, 0)
          break
      }
      console.log(distance)
      endProps.delay = this.props.delaySpeed
      endProps.ease = this.props.ease
      // endProps.onComplete = this.completeHandler
      TweenMax.fromTo(this.groupRef.current.querySelector('.drizzle-zoom'), this.props.speed, startProps, endProps)

      //   TweenMax.fromTo(this.groupRef.current.querySelector('.drizzle-zoom'), this.props.speed, tweenFrom, {
      //     opacity: 1,
      //     scale: 1,
      //     delay: this.props.delaySpeed,
      //     onComplete: this.completeHandler,
      //     ease: this.ease,
      //   })
      this.setState({ hasShown: true })
    }
  }

  render() {
    return (
      <Box
        ref={this.groupRef}
        style={{
          overflow: 'hidden',
          position: this.props.position,
          height: '100%',
          width: '100%',
          display: this.props.display,
        }}
      >
        <div className='drizzle-zoom' style={{ position: 'relative', height: '100%', width: '100%' }}>
          {this.props.children}
        </div>
      </Box>
    )
  }
}

function clipPath(top = 0, right = 0, bottom = 0, left = 0) {
  const paths = {
    clipPath: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
    // TODO: make up/down work in safari
    webkitClipPath: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
  }
  return paths
}
// Specifies the default values for props:
WipeAppear.defaultProps = {
  distance: NaN,
  zoomScale: 1.2,
}

WipeAppear.propTypes = {
  speed: PropTypes.number,
  delay: PropTypes.number,
  zoomScale: PropTypes.number,
  distance: PropTypes.number,
  showing: PropTypes.bool,
  position: PropTypes.string,
  display: PropTypes.string,
  ease: PropTypes.string,
  direction: PropTypes.string,
  children: PropTypes.any,
}
