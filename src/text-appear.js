import PropTypes from 'prop-types'
import React, { useEffect, useState, useRef, Component } from 'react'
import { TweenMax } from 'gsap'
import { DrizzleContext } from './drizzle-context'

export class TextAppear extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: props.delay ? props.delay : 0,
      hasShown: false,
      complete: false,
      showing: false,
    }
    this.groupRef = React.createRef()
    this.animationStage = React.createRef()
  }
  componentDidMount() {
    this.check()
  }
  componentDidUpdate() {
    this.check()
  }

  check() {
    // if we're rendering this component server-side, show it
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      if (!this.state.hasShown) {
        this.setState({ hasShown: true })
        this.setState({ complete: true })
      }
      return
    }
    if (this.props.showing && !this.state.hasShown) {
      this.setState({ showing: true })
      const originalContent = this.groupRef.current.innerHTML
      this.animationStage.current.innerHTML = originalContent
      const el = this.animationStage.current.firstElementChild
      const childNodeCount = this.groupRef.current.childElementCount
      if (childNodeCount !== 1) {
        console.log(`Drizzle Warning: type="text" must only contain one child node. Contains: ${childNodeCount}:`)
        console.log(this.groupRef.current.innerHTML)
      }
      let lineCount = wrapLines(el)
      const lines = el.querySelectorAll('.drizzle-word')
      const speed = this.props.speed / lines.length + 1

      const complete = (i) => {
        if (i === lineCount - 1) {
          el.innerHTML = originalContent
          //   this.completeHandler()
          this.setState({ complete: true })
        }
      }
      el.querySelectorAll('a').forEach((link) => {
        link.style.textDecoration = 'none'
      })

      for (var i = 0; i < lineCount; i++) {
        const lineWords = el.querySelectorAll(`.drizz-word-line-${i}`)
        lineWords.forEach((lw) => {
          lw.style.position = 'relative'
          lw.style.display = 'inline-block'
        })
        TweenMax.fromTo(
          lineWords,
          speed,
          { y: this.props.distance, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            delay: this.props.delay + i * this.context.textLineStaggerSpeed,
            onComplete: complete,
            onCompleteParams: [i],
            ease: this.props.ease,
            clearProps: 'all',
          }
        )
      }
      this.setState({ hasShown: true })
    }
  }

  render() {
    return (
      <span>
        <span
          ref={this.groupRef}
          style={{
            visibility: this.props.showing ? 'visible' : 'hidden',
            display: this.state.complete || !this.props.showing ? 'block' : 'none',
          }}
        >
          {this.props.children}
        </span>
        <span style={{ display: this.state.complete ? 'none' : 'block' }} ref={this.animationStage} />
      </span>
    )
  }
}
// Specifies the default values for props:
TextAppear.defaultProps = {
  distance: NaN,
}

TextAppear.propTypes = {
  showing: PropTypes.bool,
  distance: PropTypes.number,
  children: PropTypes.any,
}

TextAppear.contextType = DrizzleContext

function wrapLines($container) {
  // wraps words in spans, preserving html
  $container.innerHTML = $container.innerHTML.replace(
    /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
    '$1<span class="drizzle-word">$2</span>'
  )
  let lineIndex = -1
  let lineTop = null
  let wordEls = $container.querySelectorAll('.drizzle-word')
  console.log(wordEls)
  wordEls.forEach((word, index) => {
    if (word.offsetTop !== lineTop) {
      lineTop = word.offsetTop
      lineIndex++
    }
    word.classList.add(`drizz-word-line-${lineIndex}`)
  })
  const lineCount = lineIndex + 1
  return lineCount
}
