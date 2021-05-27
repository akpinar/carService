module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                // "absoluteRuntime": false,
                "corejs": false,
                // "helpers": true,
                "regenerator": true,
                // "useESModules": false
            }
        ]]

}
