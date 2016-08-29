export const gutterSize = 20
export const type = (kind) => {
  return {
    sans: {
      fontSize: '16px',
      fontFamily: 'Helvetica'
    },
    sansUpper: {
      fontSize: '14px',
      fontFamily: 'Helvetica',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      fontWeight: 'bold'
    }
  }[kind]
}
