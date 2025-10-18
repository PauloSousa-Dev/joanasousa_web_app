import { getHome } from "@/lib/content";

export default async function Home() {
  const home = await getHome();
  return (
    <main className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">
        {home?.heroTitle ?? "Treino que transforma"}
      </h1>
      <p className="text-lg mb-6">
        {home?.heroSubtitle ?? "Marca a tua sessão"}
      </p>
      <a href="#contact" className="bg-black text-white px-6 py-3 rounded-md">
        {home?.cta ?? "Contactar"}
      </a>
    </main>
  );
}
