import React from 'react'
import { DrizzleContext, drizzleSettingsDefault } from './drizzle-context'
import PropTypes from 'prop-types'

export const DrizzleSettings = (props) => {
  const settings = {
    ...drizzleSettingsDefault,
    ...props,
  }

  // dont want to pass children as a value
  if (settings.children) {
    delete settings.children
  }

  return <DrizzleContext.Provider value={settings}>{props.children}</DrizzleContext.Provider>
}

DrizzleSettings.propTypes = {
  speed: PropTypes.number,
  ease: PropTypes.string,
  staggerSpeed: PropTypes.number,
  groupStaggerSpeed: PropTypes.number,
  waitForChildImages: PropTypes.bool,
  textLineStaggerSpeed: PropTypes.number,
  distance: PropTypes.number,
  visibilityRootMargin: PropTypes.any,
  visibilityThreshold: PropTypes.any,
  children: PropTypes.any,
}
