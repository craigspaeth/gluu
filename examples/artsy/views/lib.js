import { assign } from 'lodash'

export const largeMargin = 50
export const mediumMargin = 30
export const smallMargin = 20
export const graySemibold = '#666666'
export const purpleRegular = '#6e1fff'

export const type = (family, size = 'body') => {
  if (family === 'garamond') {
    return {
      fontFamily: 'Adobe Garamond Pro',
      fontSize: {
        largeHeadline: '37px',
        body: '17px',
        largeCaption: '15px'
      }[size],
      lineHeight: {
        largeHeadline: '1.2em',
        body: '1.5em',
        largeCaption: '1.25em'
      }[size]
    }
  } else if (family === 'avantgarde') {
    return {
      fontFamily: 'Avant Garde Gothic ITCW01Dm',
      fontSize: {
        largeHeadline: '17px',
        body: '13px'
      }[size],
      lineHeight: {
        largeHeadline: '1.33em',
        body: '1.33em'
      }[size],
      textTransform: 'uppercase',
      letterSpacing: '1px'
    }
  }
}

export const button = (kind) => ({
  follow: assign(type('garamond', 'body'), {
    background: 'transparent',
    border: 0,
    padding: 0
  })
}[kind])
