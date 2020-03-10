import React from 'react'

export const drizzleSettingsDefault = {
  waitForChildImages: true,
  speed: 1,
  ease: 'Power2.easeOut',
  staggerSpeed: 0.1,
}

// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const DrizzleContext = React.createContext(drizzleSettingsDefault)
