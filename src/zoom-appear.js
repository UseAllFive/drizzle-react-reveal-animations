import { Box } from 'rebass'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TweenMax } from 'gsap'

export class ZoomAppear extends Component {
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

      TweenMax.fromTo(this.groupRef.current.querySelector('.drizzle-zoom'), this.props.speed, tweenFrom, {
        opacity: 1,
        scale: 1,
        delay: this.props.delaySpeed,
        onComplete: this.completeHandler,
        ease: this.ease,
      })
      this.setState({ hasShown: true })
    }
  }

  render() {
    return (
      <div
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
      </div>
    )
  }
}
// Specifies the default values for props:
ZoomAppear.defaultProps = {
  distance: NaN,
  zoomScale: 1.2,
}

ZoomAppear.propTypes = {
  speed: PropTypes.number,
  delay: PropTypes.number,
  zoomScale: PropTypes.number,
  distance: PropTypes.number,
  showing: PropTypes.bool,
  ease: PropTypes.string,
  position: PropTypes.string,
  display: PropTypes.string,
  direction: PropTypes.string,
  children: PropTypes.any,
}
