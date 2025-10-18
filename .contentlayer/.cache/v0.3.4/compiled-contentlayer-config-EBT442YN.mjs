// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Home = defineDocumentType(() => ({
  name: "Home",
  filePathPattern: "home/index.yaml",
  contentType: "data",
  fields: {
    title: { type: "string", required: true },
    heroTitle: { type: "string", required: true },
    heroSubtitle: { type: "string", required: true },
    cta: { type: "string", required: true }
  }
}));
var Pricing = defineDocumentType(() => ({
  name: "Pricing",
  filePathPattern: "pricing/**/*.md",
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "markdown", required: true },
    price: { type: "string", required: true },
    duration: { type: "string", required: true }
  }
}));
var Gallery = defineDocumentType(() => ({
  name: "Gallery",
  filePathPattern: "gallery/**/*.yml",
  contentType: "data",
  fields: {
    title: { type: "string", required: true },
    items: {
      type: "list",
      of: {
        type: "object",
        fields: {
          image: { type: "string", required: true },
          alt: { type: "string", required: true }
        }
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Home, Pricing, Gallery],
  disableImportAliasWarning: true
});
export {
  Gallery,
  Home,
  Pricing,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-EBT442YN.mjs.map
