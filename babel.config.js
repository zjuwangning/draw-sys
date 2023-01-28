module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": [
                        "last 2 versions",
                        "ie >= 8",
                        "chrome >= 50"
                    ]
                }
            }
        ],
        [
            "@babel/preset-react"
        ]
    ],
    "plugins": [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
        [
            "import",
            {
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": "css"
            }
        ]
    ]
}
