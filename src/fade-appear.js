import { Box } from 'rebass'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TweenMax } from 'gsap'

export class FadeAppear extends Component {
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
      }
      switch (this.props.direction) {
        case 'up':
          tweenFrom.y = this.props.distance
          break
        case 'down':
          tweenFrom.y = -this.props.distance
          break
        case 'left':
          tweenFrom.x = this.props.distance
          break
        case 'right':
          tweenFrom.x = -this.props.distance
          break
      }
      TweenMax.fromTo(this.groupRef.current, this.props.speed, tweenFrom, {
        opacity: 1,
        x: 0,
        y: 0,
        ease: this.props.ease,
        delay: this.props.delay,
      })
      this.setState({ hasShown: true })
    }
  }

  render() {
    return (
      <Box
        ref={this.groupRef}
        sx={{
          visibility: this.props.showing ? 'visible' : 'hidden',
          height: '100%',
          width: '100%',
          position: 'relative',
        }}
      >
        {this.props.children}
      </Box>
    )
  }
}
// Specifies the default values for props:
FadeAppear.defaultProps = {
  distance: NaN,
}

FadeAppear.propTypes = {
  speed: PropTypes.number,
  delay: PropTypes.number,
  distance: PropTypes.number,
  showing: PropTypes.bool,
  ease: PropTypes.string,
  direction: PropTypes.string,
  children: PropTypes.any,
}
