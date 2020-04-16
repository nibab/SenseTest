module.exports = {
  theme: {
    fontFamily: {
      body: ['Roboto', 'sans-serif'],
    },
    extend: {
      spacing: {
        '0.5': '.125rem',
        '1.5': '.375rem',
        '2.5': '.625rem',
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
