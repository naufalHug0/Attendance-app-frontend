/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'red-primary':'#C62A36',
        'green-bg':'#E0FBEC',
        'green-txt':'#339D5E',
        'red-bg':'#F8D7DA',
        'red-txt':'#B13144',
        'blue-bg':'#DBEBFE',
        'blue-txt':'#1E3A8A',
        'blue-notif':'#3E97FF'
      },
      keyframes:{
        modal: {
        '0%': { opacity: '0',transform: 'scale(.95)' },
        '100%': { opacity: '1',transform: 'scale(1)' },
        },
        overlay: {
        '0%': { opacity: '0'},
        '100%': { opacity: '1'}
        },
        modal_leave: {
          '0%': { opacity: '1',transform: 'scale(1)' },
          '100%': { opacity: '0',transform: 'scale(.95)' },
        },
        check: {
          '0%': {},
          '50%': { width: '48px',height: '48px' },
          '100%': { width: '100%', },
        },
        opacity: {
          '0%': {opacity:'0'},
          '100%': { opacity: '1' },
        },
        float_in: {
          '0%': {top:'-320px'},
          '100%': { top:'12px' },
        },
        progress: {
          '0%':{width:'0'}
        }
      },
      animation: {
        modal: 'modal .3s ease-out',
        overlay: 'overlay 400ms ease-out',
        check: 'check 2.5s ease-in-out forwards',
        opacity: 'opacity 1s ease-in-out',
        modal_leave: 'modal_leave 200ms ease-in',
        progress:'progress .5s ease-in-out',
        float_in:'float_in 1.2s ease-in-out forwards'
      },
    },
  },
  plugins: [],
} 
