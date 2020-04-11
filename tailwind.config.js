module.exports = {
  theme: {
    fontFamily: {
      body: ['Roboto', 'sans-serif'],
    },
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    height: ['responsive', 'hover', 'focus']
  },
  plugins: [],
}
