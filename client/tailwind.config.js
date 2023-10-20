/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "12vmax": "12vmax",
        "30vh": "30vh",
      },
      width: {
        "50per": "50%",
        "70vw": "70vw",
      },
      backgroundColor: {
        "black-0.5": "rgba(0,0,0,0.5)",
        "black-footer": "#333",
      },
      fontSize: {
        "fs-1": "2.2vmax",
        "fs-2": "2.5vmax",
      },
    },
  },
  plugins: [],
};
