tailwind.config = {
    theme: {
        extend: {
            colors: {
                'bmw-blue': '#0066B1',
                'bmw-dark': '#1A1A1A',
                'bmw-light': '#F5F5F5'
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif']
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'slide-up': 'slideUp 0.5s ease-out'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                }
            }
        }
    }
}
