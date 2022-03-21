module.exports = {
    extends: ["prettier"],
    plugins: ["prettier"],
    env: {
        es6: true,
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": "error",
    },
};
