import { loadGallery } from "@/lib/loaders"

export const metadata = { title: "Galeria" }

export default function GalleryPage() {
  const sets = loadGallery()
  const items = sets.flatMap(s => s.items ?? [])
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-heading">Galeria</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((it, i) => (
          <figure key={i} className="overflow-hidden rounded-xl border">
            <img
              src={it.image}
              alt={it.alt}
              className="h-full w-full object-cover"
            />
          </figure>
        ))}
        {items.length === 0 && <p>Sem imagens ainda.</p>}
      </div>
    </section>
  )
}
