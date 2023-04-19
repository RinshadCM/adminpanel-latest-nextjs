module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                collabi: {
                    green: "rgba(1,162,164,1)",
                },
                smoke: {
                    light: "rgba(0, 0, 0, 0.4)",
                },
            },
        },
        fontFamily: {
            "inter": ["inter", "sans-serif"]
        }
    },
    plugins: [],
};
