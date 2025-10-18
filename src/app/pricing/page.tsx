import { loadPricing } from "@/lib/loaders"

export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  const plans = loadPricing()
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-heading">Pricing</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map(p => (
          <article key={p.slug} className="rounded-xl border p-4">
            <h3 className="text-xl font-heading">{p.title}</h3>
            <p className="mt-1 text-2xl font-semibold">{p.price}</p>
            <p className="text-sm text-neutral-600">{p.duration}</p>
            {p.description && <p className="mt-3">{p.description}</p>}
          </article>
        ))}
        {plans.length === 0 && <p>Sem planos definidos ainda.</p>}
      </div>
    </section>
  )
}
