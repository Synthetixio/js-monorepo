import "styles/index.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    default: "Light",
    values: [
      {
        name: "Light",
        value: "#ffffff"
      },
      {
        name: "Dark",
        value: "#141414"
      }
    ]
  },
  darkMode: {
    stylePreview: true,
    darkClass: "ui-dark",
    classTarget: "html"
  }
};
