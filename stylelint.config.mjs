/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  rules: {
    "at-rule-no-unknown": null,
    "at-rule-no-deprecated": null,
    "selector-class-pattern": [
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$|^([a-z][a-zA-Z0-9]*)$",
      {
        message: "Expected class selector to be kebab-case or camelCase",
      },
    ],
  },
};
