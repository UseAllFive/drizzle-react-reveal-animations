import PropTypes from 'prop-types'
import { Text } from 'rebass'
import React, { Component } from 'react'
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
      textContent: '',
    }
    // this.groupRef = React.createRef()
    this.animationStage = React.createRef()
  }
  componentDidMount() {
    this.check()
    if (this.animationStage.current) {
      this.setState({ textContent: this.animationStage.current.innerText })
    }
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
    this.isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)
    if (this.props.showing && !this.state.hasShown) {
      this.setState({ showing: true })
      // this.animationStage.current.innerHTML = originalContent
      const el = this.animationStage.current.firstElementChild
      const childNodeCount = this.animationStage.current.childElementCount
      if (childNodeCount !== 1) {
        console.log(`Drizzle Warning: type="text" must only contain one child node. Contains: ${childNodeCount}:`)
        console.log(this.animationStage.current.innerHTML)
      }
      let lineCount = wrapLines(el)
      const lines = el.querySelectorAll('.drizzle-word')
      const speed = this.props.speed / lines.length + 1

      const complete = (i) => {
        if (i === lineCount - 1) {
          // el.innerHTML = originalContent
          //   this.completeHandler()
          this.setState({ complete: true })
        }
      }
      //   el.querySelectorAll('a').forEach((link) => {
      //     link.style.textDecoration = 'none'
      //   })

      for (var i = 0; i < lineCount; i++) {
        const lineWords = el.querySelectorAll(`.drizz-word-line-${i}`)
        lineWords.forEach((lw) => {
          lw.style.position = 'relative'
          lw.style.display = 'inline-block'
          lw.style.top = '0'
          lw.style.left = '0'
          // lw.style['-webkit-font-smoothing'] = 'antialiased'
          lw.style['-webkit-backface-visibility'] = 'hidden'
          // lw.style.textRendering = 'geometricPrecision'
        })

        TweenMax.fromTo(
          lineWords,
          speed,
          { x: 0, y: this.props.distance, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            delay: this.props.delay + i * this.context.textLineStaggerSpeed,
            onComplete: complete,
            onCompleteParams: [i],
            ease: this.props.ease,
          }
        )
      }
      this.setState({ hasShown: true })
    }
  }

  render() {
    return (
      <Text as='span' style={{ perspective: '100px', ...this.props.style }} sx={this.props.sx} aria-label={this.state.textContent}>
        <span ref={this.animationStage} aria-hidden='true'>
          {this.props.children}
        </span>
      </Text>
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
  speed: PropTypes.number,
  style: PropTypes.object,
  delay: PropTypes.number,
  ease: PropTypes.string,
  sx: PropTypes.object,
}

TextAppear.contextType = DrizzleContext

function wrapLines($container) {
  // wraps words in spans, preserving html
  const wrappedText = $container.innerHTML.replace(
    /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
    '$1<span class="drizzle-word">$2</span>'
  )
  // wrap the spaces as words too:
  $container.innerHTML = wrappedText
  let lineIndex = -1
  let lineTop = null
  let wordEls = $container.querySelectorAll('.drizzle-word')

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
