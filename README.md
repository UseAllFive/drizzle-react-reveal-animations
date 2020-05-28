# react-drizzle

> A react library to help sequence reveal animations on scroll.

[![NPM](https://img.shields.io/npm/v/react-drizzle.svg)](https://www.npmjs.com/package/react-drizzle) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![Drizzle](https://media1.tenor.com/images/b9a01bfaa8c4efafe27e52a1af7444bc/tenor.gif)

## Install

```bash
npm install --save react-drizzle
```

Requires Peer Dependency: gsap

```
npm install --save gsap
```

## Usage

```jsx
import React, { Component } from 'react'

import Drizzle, { DrizzleSettings } from 'react-drizzle'

class Example extends Component {
  render() {
    return (
      <DrizzleSettings speed={2}>
        <Drizzle type="text" group="my-group-namespace">
          <h1>
            Text you<br></br> want to<br></br>Animate
          </h1>
        </Drizzle>

        <Drizzle type="fade-up" group="my-group-namespace">
          {/* it will wait to load image before revealing the group */}
          <img
            width="130"
            height="auto"
            src="https://images.unsplash.com/photo-1532264523420-881a47db012d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=100"
          ></img>
        </Drizzle>

        <Drizzle type="fade-up" group="second-group">
          <img
            width="130"
            height="auto"
            src="https://images.unsplash.com/photo-1532264523420-881a47db012d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=100"
          ></img>
        </Drizzle>
      </DrizzleSettings>
    )
  }
}
```

### Attributes

#### `<Drizzle>`

- `type`: `fade` or `text`. Can take a direction:
  - `-up`, `-down`, `-left`, `-right`, ex: `type="fade-down"`
- `order`: Number - if this isn't set, it picks the order based off creation order. Elements with an order set always rank higher than elements without an order. The plugin sets a calculated order — for example, if two elements have the order 1, 5, 7, the calculated orders get set to 0, 1, 2.
- `speed`: Number in seconds (default: 1) - the time it takes for a single Drizzle element to appear. This is multiplied by its calculated order.
- `delay`: Number in seconds (default: 0) - the amount of time to wait to reveal the item, after it is ready to reveal.
- `distance`: Number - pixel distance (default: 25). Used for movement, such as a `fade-up`
- `onAppear`: Function - callback that triggers when the item is ready to reveal, e.g. when the item moves into view.
- `visibilityRootMargin` String or Number - (default: 0) Margin around the root. See [Intersection Observer API
  ](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_concepts_and_usage)
- `visibilityThreshold` Array or Number - (default: 0.3) Indicates at what percentage of the target's visibility the observer's callback should be executed [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_concepts_and_usage)
- `containerSx`: Extend sx props to the container element
- `containerStyle`: Extend style props to the container element
- `sx`: Extend sx props to the underlying animation element
- `style`: Extend style props to the underlying animation element

#### `<DrizzleSettings>` - global settings applied to all child `<Drizzle>` elements

- Can set defaults for `speed`, `delay`, `distance`, `visibilityRootMargin`, `visibilityThreshold`.
- `staggerSpeed`: Number in seconds (default: 0.1) - the time to wait between revealing Drizzle items within the group.
- `ease`: String (default: 'Power2.easeOut') - a GSAP tween. ex: `ease={'elastic.out(1, 0.3)'}`
  - [GSAP Ease Visualizer](https://greensock.com/ease-visualizer/)
- `waitForChildImages`: Boolean (default: true) - doesn't reveal group until images in the group are loaded.
- `textLineStaggerSpeed`: Number in seconds (default: 0.1) - for `type="text"`; the time to wait between revealing lines of text.

#### Order of operations:

Drizzle is on screen, wait for staggerSpeed, wait for delay speed, then display its children.

## License

MIT © [UseAllFive](https://github.com/UseAllFive)
