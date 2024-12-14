import type { CustomAtRuleDefinition, Token, Visitor } from "lightningcss";

const visitor: Visitor<{ [name: string]: CustomAtRuleDefinition }> = {
  Declaration(property) {
    if (
      property.property === "custom" &&
      property.value.name.startsWith("--color")
    ) {
      const valueFunction = property.value.value[0];

      if (
        valueFunction.type === "function" &&
        valueFunction.value.name === "oklch"
      ) {
        const lightness = (
          (valueFunction.value.arguments[0] as { type: "token"; value: Token })
            .value as { type: "number"; value: number }
        ).value;
        const chroma = (
          (valueFunction.value.arguments[2] as { type: "token"; value: Token })
            .value as { type: "number"; value: number }
        ).value;
        const hue = (
          (valueFunction.value.arguments[4] as { type: "token"; value: Token })
            .value as { type: "number"; value: number }
        ).value;

        let alpha = 1;

        if (valueFunction.value.arguments.length > 5) {
          alpha = (
            (
              valueFunction.value.arguments[6] as {
                type: "token";
                value: Token;
              }
            ).value as { type: "number"; value: number }
          ).value;
        }

        return {
          property: "custom",
          value: {
            name: property.value.name,
            value: [
              {
                type: "color",
                value: {
                  type: "oklch",
                  l: lightness,
                  c: chroma,
                  h: hue,
                  alpha: alpha,
                },
              },
            ],
          },
        };
      }
    }
  },
};

export default visitor;
