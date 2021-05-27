module.exports = {
    "root": true,
    "parser": 'babel-eslint',
    "env": {
        "browser": true
    },
    "extends": "standard",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        'html'
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'space-before-function-paren': ['error',
            {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always"
            }]
    }
};
