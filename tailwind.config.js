module.exports = {
    mode: "jit",
    content: ["./src/index.html", "./src/**/*.{ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            gridTemplateRows: {
                mainpage: "6rem minmax(0, 3fr) 2rem"
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
