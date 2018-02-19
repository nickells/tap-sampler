module.exports = {
    "extends": "airbnb",
    "rules": {
      "semi": "off",
      "react/jsx-filename-extension": "off",
      "import/prefer-default-export": "off",
      "indent": ["warn", 2, {
        "MemberExpression": "off"
      }]
    },
    "env": {
      "browser": true,
      "node": true,
    },
};