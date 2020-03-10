import { Box } from 'rebass'
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
      wrapLines(el)
      const lines = el.querySelectorAll('.ani-line')
      const speed = this.context.speed / lines.length + 1

      const complete = (i) => {
        if (i === lines.length - 1) {
          el.innerHTML = originalContent
          // this.completeHandler()
          this.setState({ complete: true })
        }
      }

      lines.forEach((item, index) => {
        const $group = item.querySelector('.ani-line-group')
        item.style.display = 'flex'
        $group.style.display = 'inline-block'
        TweenMax.fromTo(
          $group,
          speed,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            delay: this.context.delay + index * this.context.textLineStaggerTime,
            onComplete: complete,
            onCompleteParams: [index],
            ease: this.context.ease,
            clearProps: 'all',
          }
        )
      })
      this.setState({ hasShown: true })
    }
  }

  render() {
    return (
      <span>
        <span ref={this.groupRef} style={{ display: this.state.complete ? 'block' : 'none' }}>
          {this.props.children}
        </span>
        <span style={{ display: this.state.complete ? 'none' : 'block' }} ref={this.animationStage} />
      </span>
    )
  }
}

TextAppear.propTypes = {
  showing: PropTypes.bool,
}

TextAppear.contextType = DrizzleContext

function wrapLines($container) {
  // get the text from the conatiner
  // console.log($container.innerHTML)
  $container.innerHTML = $container.innerHTML.replace(/<br>/g, '\n')
  // console.log($container.innerHTML)

  var text = $container.textContent

  // split the text into words
  var words = text.split(' ')

  var parsedWords = []
  words.forEach((word) => {
    if (word.indexOf('-') !== -1) {
      var hyphenatedWords = word.split('-')
      hyphenatedWords.forEach((hw, i) => {
        let wordUpdated = hw
        if (i !== hyphenatedWords.length - 1) {
          wordUpdated += '-'
        }
        parsedWords.push(wordUpdated)
      })
    } else {
      parsedWords.push(word)
    }
  })

  // wrap each word in a span and add it to a tmp
  var tmp = ''
  parsedWords.forEach((word) => {
    let spacing = word.indexOf('-') !== -1 ? '' : ' '
    if (word.indexOf('\n') === -1) {
      tmp += `<span>${word}${spacing}</span>`
    } else {
      const breakWord = word.split('\n')
      breakWord.forEach((w, i) => {
        let spacing = w.indexOf('-') !== -1 ? '' : ' '
        const selector = i > 0 ? ' class="ani-break"' : ''
        tmp += `<span${selector}>${w}${spacing}</span>`
      })
    }
  })

  // remove the text from the container, and replace it with the wrapped words
  $container.innerHTML = tmp

  // prepare the offset variable and tmp
  var tmp = ''
  var top = null
  var wordSpans = $container.querySelectorAll('span')
  $container.querySelectorAll('span').forEach((word, index) => {
    // if this is the first iteration
    if (top === null) {
      // set the top
      top = word.offsetTop
      // open the first line
      tmp = '<span class="ani-line"><span class="ani-line-group">'
    }

    // if this is a new line (top is bigger then the previous word)
    if (top < word.offsetTop || word.classList.contains('ani-break')) {
      // close the previous line and start a new one
      tmp += '</span></span><span class="ani-line"><span class="ani-line-group">'
      // change the top
      top = word.offsetTop
    }
    let spacing = word.innerText.indexOf('-') !== -1 ? '' : ' '
    // add the content of the word node + a space
    tmp += word.innerText + spacing
  })
  // close the last line
  tmp += '</span>'

  // remove the content of the conatiner, and replace it with the wrapped lines
  $container.innerHTML = tmp
}
