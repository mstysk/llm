import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
      extend: {
          keyframes: {
              "accordion-down": {
                  from: { height: "0" },
                  to: { height: "var(--radix-accordion-content-height)" },
              },
              "accordion-up": {
                  from: { height: "var(--radix-accordion-content-height)" },
                  to: { height: "0"},
              },
          },
          animation: {
              "accordion-down": "accordion-down 0.2s ease-out",
              "accordion-up": "accordion-up 0.2s ease-out",
          },
      }
  }
} satisfies Config;
