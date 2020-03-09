# react-drizzle

> A react library to help sequence reveal animations on scroll.

[![NPM](https://img.shields.io/npm/v/react-drizzle.svg)](https://www.npmjs.com/package/react-drizzle) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-drizzle
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-drizzle'

class Example extends Component {
  render() {
    return (
      <h1>
        <Drizzle type="text" group="my-group-namespace">
            Text you<br></br> want to<br></br>Animate
        </Drizzle>
      </h1>

      <Drizzle type="fade-up" group="my-group-namespace">
          {/* it will wait to load image before revealing the group */}
          <img
            width="130"
            height="auto"
            src="https://images.unsplash.com/photo-1532264523420-881a47db012d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&   auto=format&fit=crop&w=500&q=100"
          ></img>
      </Drizzle>
    )
  }
}
```

## License

MIT © [UseAllFive](https://github.com/UseAllFive)
