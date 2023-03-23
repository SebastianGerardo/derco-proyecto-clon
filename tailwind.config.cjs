module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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