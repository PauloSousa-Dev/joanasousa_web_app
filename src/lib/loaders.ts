import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import yaml from "yaml"

const CONTENT_DIR = path.join(process.cwd(), "content")

export type HomeData = {
  title: string
  heroTitle: string
  heroSubtitle: string
  cta: string
}

export function loadHome(): HomeData {
  const p = path.join(CONTENT_DIR, "home", "index.yaml")
  const raw = fs.readFileSync(p, "utf8")
  const data = yaml.parse(raw) as HomeData
  return data
}

export type PricingPlan = {
  title: string
  price: string
  duration: string
  description?: string
  body?: string
  slug: string
}

export function loadPricing(): PricingPlan[] {
  const dir = path.join(CONTENT_DIR, "pricing")
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"))
  return files.map(file => {
    const slug = file.replace(/\.md$/, "")
    const raw = fs.readFileSync(path.join(dir, file), "utf8")
    const { data, content } = matter(raw)
    return {
      title: String(data.title ?? ""),
      price: String(data.price ?? ""),
      duration: String(data.duration ?? ""),
      description:
        typeof data.description === "string" ? data.description : undefined,
      body: content?.trim() || undefined,
      slug,
    }
  })
}

export type GalleryItem = { image: string; alt: string }
export type GalleryData = { title: string; items: GalleryItem[] }

export function loadGallery(): GalleryData[] {
  const dir = path.join(CONTENT_DIR, "gallery")
  if (!fs.existsSync(dir)) return []
  const files = fs
    .readdirSync(dir)
    .filter(f => f.endsWith(".yml") || f.endsWith(".yaml"))
  return files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8")
    const data = yaml.parse(raw) as GalleryData
    return data
  })
}
