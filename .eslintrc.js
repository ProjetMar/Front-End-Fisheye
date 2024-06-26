module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "plugins": ["html"],
    //"plugins": ["@html-eslint"],
    /* "overrides": [
        // {
        //     "env": {
        //         "node": true
        //     },
        //     "files": [
        //         ".eslintrc.{js,cjs}"
        //     ],
        //     "parserOptions": {
        //         "sourceType": "script"
        //     }
        // }
        {
            file: ["*.html"],
            parser: "@html-eslint/parser",
            extends: ["plugin:@html-eslint/recommended"],
        }
    ], */
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": ["error", { "varsIgnorePattern": "_onclick" }]
    },
    "globals": {
        window: true,
        module: true
      }
}
