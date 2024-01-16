/** @type {import('tailwindcss').Config} */

/**
   * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
   */
  module.exports = {
    content: [
    "./node_modules/flowbite-react/lib/**/*.js",
      "./pages/**/*.{ts,tsx}",
      "./public/**/*.html",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    plugins: [
      require("flowbite/plugin")
    ],
    theme: {},
  };