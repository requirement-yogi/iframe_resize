module.exports = {
    root: true,
    env: {
        browser: true,
        es2022: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:jsx-control-statements/recommended",
        "prettier",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["react", "react-hooks", "jsx-a11y", "jsx-control-statements"],
    globals: {
        AP: "readonly",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    ignorePatterns: ["dist/", "storybook-static/", "node_modules/"],
    overrides: [
        // TypeScript
        {
            files: ["**/*.{ts,tsx}"],
            extends: ["plugin:@typescript-eslint/recommended-type-checked"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: true,
            },
            plugins: ["@typescript-eslint"],
            rules: {
                /**
                 * Ignore unused variables that start with an underscore.
                 * Reason: When destructuring objects, we sometimes need to ignore some properties.
                 */
                "@typescript-eslint/no-unused-vars": [
                    "error",
                    { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
                ],
            },
        },

        // Tests
        {
            files: ["**/__tests__/**/*.{js,jsx,ts,tsx}", "**/*.{test,spec}.{js,jsx,ts,tsx}"],
            extends: ["plugin:jest/recommended", "plugin:jest-dom/recommended", "plugin:testing-library/react"],
            plugins: ["jest", "jest-dom", "testing-library"],
        },

        // Storybooks
        {
            files: ["**/*.stories.{js,jsx,ts,tsx}"],
            extends: ["plugin:storybook/recommended"],
            plugins: ["storybook"],
        },
    ],
    rules: {
        /**
         * Allow JSX components coming from globals.
         * Reason: We use JSX control statements which are components transformed by Babel.
         */
        "react/jsx-no-undef": ["error", { allowGlobals: true }],
    },
};
