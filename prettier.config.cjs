/** @type {import("prettier").Config} */
const config = {
    ...require("@pentible/prettier"),
    plugins: [
        require.resolve("prettier-plugin-tailwindcss"),
        require.resolve("prettier-plugin-packagejson"),
    ],
};

module.exports = config;
