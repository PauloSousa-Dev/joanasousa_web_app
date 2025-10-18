import { config, fields, collection, singleton } from "@keystatic/core";

const isProd = process.env.NODE_ENV === "production";

export default config({
  storage: isProd
    ? {
        kind: "github",
        repo: { owner: "PauloSousa-Dev", name: "joanasousa_web_app" },
      }
    : {
        kind: "local",
      },
  ui: { brand: { name: "Joana Sousa Centro de Treino" } },
  singletons: {
    home: singleton({
      path: "content/home",
      label: "Home",
      schema: {
        heroTitle: fields.text({ label: "Título principal" }),
        heroSubtitle: fields.text({ label: "Subtítulo" }),
        cta: fields.text({ label: "Texto do botão" }),
      },
    }),
    about: singleton({
      path: "content/about",
      label: "Sobre",
      schema: {
        title: fields.text({ label: "Título" }),
        body: fields.document({
          label: "Descrição",
          formatting: true,
          links: true,
        }),
      },
    }),
  },
  collections: {
    pricing: collection({
      label: "Planos",
      path: "content/pricing/*",
      slugField: "title",
      schema: {
        title: fields.text({ label: "Plano" }),
        price: fields.text({ label: "Preço" }),
        duration: fields.text({ label: "Duração" }),
        description: fields.text({
          label: "Descrição",
          multiline: true,
          validation: { isRequired: false },
        }),
      },
    }),
    gallery: collection({
      label: "Galeria",
      path: "content/gallery/*",
      slugField: "title",
      schema: {
        title: fields.text({ label: "Título" }),
        image: fields.image({ label: "Imagem", directory: "public/uploads" }),
        alt: fields.text({ label: "Alt" }),
      },
    }),
  },
});
