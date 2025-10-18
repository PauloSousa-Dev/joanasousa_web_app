import { loadHome } from "@/lib/loaders"

export default function HomePage() {
  const home = loadHome()
  return (
    <section className="space-y-6">
      <h2 className="text-4xl font-heading">{home.heroTitle}</h2>
      <p className="text-lg">{home.heroSubtitle}</p>
      <a href="#contact" className="inline-block rounded-xl bg-brand.primary px-5 py-3 text-brand.primaryFg">
        {home.cta}
      </a>
    </section>
  )
}
