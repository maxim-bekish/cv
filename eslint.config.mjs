import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// произвольные значения цвета/шрифта в классах: text-[#fff], bg-[rgb(...)], text-[20px], font-[Arial]
const arbitraryToken =
  "/(^|\\s|:)(text|bg|border|border-[trblxy]|outline|ring|ring-offset|fill|stroke|from|via|to|decoration|shadow|caret|accent|placeholder|divide|font|leading|tracking)-\\[/";
const arbitraryTokenMessage =
  "Используй только токены из app/globals.css (цвета, text-*, font-*). Произвольные значения вида text-[...] запрещены.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: `Literal[value=${arbitraryToken}]`,
          message: arbitraryTokenMessage,
        },
        {
          selector: `TemplateElement[value.raw=${arbitraryToken}]`,
          message: arbitraryTokenMessage,
        },
        {
          selector:
            "JSXAttribute[name.name='style'] Property[key.name=/^(color|background|backgroundColor|borderColor|fill|stroke|fontSize|fontFamily)$/]",
          message:
            "Цвета и шрифты задаются только классами-токенами, не через style.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
