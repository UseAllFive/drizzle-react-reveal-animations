import React from 'react'

export const drizzleSettingsDefault = {
  waitForChildImages: true,
  speed: 1,
  ease: 'Power2.easeOut',
  staggerSpeed: 0.1,
  textLineStaggerSpeed: 0.1,
  delay: 0,
  distance: 25,
  visibilityRootMargin: 0,
  visibilityThreshold: 0.3,
}

// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const DrizzleContext = React.createContext(drizzleSettingsDefault)
