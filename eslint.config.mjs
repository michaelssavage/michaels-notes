// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/multi-word-component-names": "off",
    "@stylistic/quote-props": ["error", "as-needed"],
    "vue/html-indent": ["error", 2],
    indent: ["error", 2],
    "@stylistic/indent": ["error", 2],
    "@stylistic/quotes": ["error", "double"],
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "vue/html-closing-bracket-newline": "off",
    "@stylistic/operator-linebreak": "off",
    "@stylistic/comma-dangle": "off",
    "@stylistic/brace-style": ["error", "1tbs"],
    "vue/singleline-html-element-content-newline": "off",
    "@stylistic/arrow-parens": ["error", "always"],
  },
});
