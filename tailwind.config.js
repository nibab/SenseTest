const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    filter: { // defaults to {}
      'none': 'none',
      'grayscale': 'grayscale(1)',
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans]
    },
    spinner: (theme) => ({
      default: {
        color: '#dae1e7', // color you want to make the spinner
        size: '1em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      },
      large: {
        color: '#dae1e7', // color you want to make the spinner
        size: '5em', // size of the spinner (used for both width and height)
        border: '5px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      }
    }),
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
    height: ['responsive', 'hover', 'focus'],
    spinner: ['responsive'],
    filter: ['responsive', 'hover']
  },
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/custom-forms'),
    require('tailwindcss-spinner')(),
    require('tailwindcss-filters')
  ]
}
