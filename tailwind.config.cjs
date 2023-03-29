module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'gp': '980px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors:{
        'redDerco': '#D90912'
      },
      zIndex: {
        "-1": "-1",
        "999":"9999"
      },
      transformOrigin: {
        "0": "0%",
      },
      backgroundImage: {
        'young-pattern': "url('/img/opt-youngmechanic.jpg')",
      }
    },
  },
  plugins: [],
  
}