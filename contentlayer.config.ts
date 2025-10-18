import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files"

export const Home = defineDocumentType(() => ({
  name: "Home",
  filePathPattern: "home/index.yaml",
  contentType: "data",
  fields: {
    title: { type: "string", required: true },
    heroTitle: { type: "string", required: true },
    heroSubtitle: { type: "string", required: true },
    cta: { type: "string", required: true },
  },
}))

export const Pricing = defineDocumentType(() => ({
  name: "Pricing",
  filePathPattern: "pricing/**/*.md",
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    description: { type: "markdown", required: true },
    price: { type: "string", required: true },
    duration: { type: "string", required: true },
  },
}))

export const Gallery = defineDocumentType(() => ({
  name: "Gallery",
  filePathPattern: "gallery/**/*.yml",
  contentType: "data",
  fields: {
    title: { type: "string", required: true },
    items: {
      type: "list",
      of: defineNestedType(() => ({
        name: "GalleryItem",
        fields: {
          image: { type: "string", required: true },
          alt: { type: "string", required: true },
        },
      })),
    },
  },
}))

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: "pages/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc.slug}`,
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Home, Pricing, Gallery, Page],
  disableImportAliasWarning: true,
})
