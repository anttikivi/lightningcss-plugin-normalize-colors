# lightningcss-plugin-normalize-colors

`lightningcss-plugin-normalize-colors` is a
[Lightning CSS](https://lightningcss.dev) plugin that implements a `Visitor` for
normalizing CSS color functions so that Lightning CSS can transform them as
expected.

The primary motivation for this plugin was that
[Tailwind CSS](https://tailwindcss.com) outputs its \`oklch\` in a format that
Lightning CSS doesn’t transform; Lightning CSS seems to require the lightness
value of the colors to be as a percentage but Tailwind CSS gives it as a decimal
number.

Currently only `oklch` functions in CSS variables are implemented, and I’m
planning on including the rest later. The main motivation was to fix CSS output
by Tailwind, and that is achieved.

### Getting started

    npm i -D lightningcss-plugin-normalize-colors

To use the plugin, pass it as a visitor to Lightning CSS.

```js
import { transform } from "lightningcss";
import normalizeColors from "lightningcss-plugin-normalize-colors";

transform({
  filename: "test.css",
  minify: true,
  code: Buffer.from(`
    :root {
      --color-stone: oklch(0.555 0.013 58.071);
    }
  `),
  visitor: normalizeColors,
});
```

## License

This package is licensed under the MIT License. See [LICENSE](LICENSE) for more
information.
