/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#37012B",
        primarybg: "#290120",
      },
      fontFamily: {
        jone: ["Jockey One"],
      },
      backgroundImage: {
        btngrad: "linear-gradient(87.03deg, #1EF1A5 -0.04%, #9746FE 99.96%)",
        tabgrad: "linear-gradient(90deg, #22EAA8 2.04%, #944AFC 100%)",
      },
    },
  },
  plugins: [],
});

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#37012B",
//         primarybg: "#290120",
//       },
//       fontFamily: {
//         jone: ["Jockey One"],
//       },
//       backgroundImage: {
//         btngrad: "linear-gradient(87.03deg, #1EF1A5 -0.04%, #9746FE 99.96%)",
//         tabgrad: "linear-gradient(90deg, #22EAA8 2.04%, #944AFC 100%)",
//       },
//     },
//   },
//   plugins: [],
// }

