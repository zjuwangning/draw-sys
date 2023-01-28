module.exports = {
    verbose: true,
    setupFiles: ['./tests/setup.js'],
    moduleFileExtensions: ["js", "json"],
    transformIgnorePatterns: [
        "<rootDir>/dist/",
        '<rootDir>/node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
    ],
    moduleNameMapper:{
        "\\.(css|less|sass|scss)$": "<rootDir>/tests/__mocks__/styleMock.js",
    },
    testURL: 'http://localhost',
}