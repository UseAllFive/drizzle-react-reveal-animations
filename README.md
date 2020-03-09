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
      <Drizzle type="fade-up" group="my-group-namespace">
        content
      </Drizzle>
    )
  }
}
```

## License

MIT © [UseAllFive](https://github.com/UseAllFive)
