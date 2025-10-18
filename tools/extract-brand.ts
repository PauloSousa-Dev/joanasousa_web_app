import fs from "node:fs"
import path from "node:path"
import pdf from "pdf-parse"

const PDF_PATH = path.join(process.cwd(), "branding", "apresentacao.pdf")

function uniq<T>(arr: T[]) { return Array.from(new Set(arr)) }

function hexToRgb(hex: string) {
  const m = hex.replace("#","")
  const r = parseInt(m.slice(0,2), 16)
  const g = parseInt(m.slice(2,4), 16)
  const b = parseInt(m.slice(4,6), 16)
  return { r, g, b }
}

function srgbToLinear(c: number) {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055)/1.055, 2.4)
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const R = srgbToLinear(r)
  const G = srgbToLinear(g)
  const B = srgbToLinear(b)
  return 0.2126*R + 0.7152*G + 0.0722*B
}

function contrastRatio(a: string, b: string) {
  const L1 = relativeLuminance(a)
  const L2 = relativeLuminance(b)
  const [max, min] = L1 >= L2 ? [L1, L2] : [L2, L1]
  return (max + 0.05) / (min + 0.05)
}

function bestTextColor(bgHex: string) {
  const white = "#FFFFFF"
  const black = "#111111"
  const cWhite = contrastRatio(bgHex, white)
  const cBlack = contrastRatio(bgHex, black)
  return cWhite >= cBlack ? white : black
}

function pickBrandColors(hexes: string[]) {
  // limpar e normalizar
  const colors = uniq(
    hexes
      .map(h => h.toUpperCase())
      .filter(h => /^#[0-9A-F]{6}$/.test(h))
      .filter(h => h !== "#000000" && h !== "#FFFFFF")
  )

  // escolher primary por saturação/luminosidade aproximada (heurística simples)
  // como não temos HSL, aproxima: evitar muito escuros (#0X0X0X) e muito claros
  const score = (hex: string) => {
    const { r,g,b } = hexToRgb(hex)
    const max = Math.max(r,g,b), min = Math.min(r,g,b)
    const sat = max === 0 ? 0 : (max - min) / max // 0..1
    const light = (max + min) / 510 // 0..1
    const centerBias = 1 - Math.abs(light - 0.5)
    return sat * 0.7 + centerBias * 0.3
  }
  const sorted = [...colors].sort((a,b) => score(b) - score(a))
  const primary = sorted[0] ?? "#3B82F6"
  const accent = (sorted.find(c => c !== primary) ?? "#F59E0B")

  // surface: procurar a mais clara; se não houver, usar branco
  const lightest = [...colors].sort((a,b) => relativeLuminance(b) - relativeLuminance(a))[0]
  const surface = lightest ?? "#FFFFFF"

  const surfaceFg = bestTextColor(surface)
  const primaryFg = bestTextColor(primary)

  return { primary, accent, surface, surfaceFg, primaryFg }
}

const KNOWN_FONTS: Record<string, { import: string, varName: string, package: string }> = {
  "INTER":        { import: "Inter",        varName: "inter",        package: "next/font/google" },
  "POPPINS":      { import: "Poppins",      varName: "poppins",      package: "next/font/google" },
  "MONTSERRAT":   { import: "Montserrat",   varName: "montserrat",   package: "next/font/google" },
  "ROBOTO":       { import: "Roboto",       varName: "roboto",       package: "next/font/google" },
  "LATO":         { import: "Lato",         varName: "lato",         package: "next/font/google" },
  "OPEN SANS":    { import: "Open_Sans",    varName: "openSans",     package: "next/font/google" },
  "OSWALD":       { import: "Oswald",       varName: "oswald",       package: "next/font/google" },
  "WORK SANS":    { import: "Work_Sans",    varName: "workSans",     package: "next/font/google" },
  "RALEWAY":      { import: "Raleway",      varName: "raleway",      package: "next/font/google" },
}

async function main() {
  if (!fs.existsSync(PDF_PATH)) {
    console.error(`PDF not found at ${PDF_PATH}`)
    process.exit(1 as any)
  }

  const parsed = await pdf(fs.readFileSync(PDF_PATH))
  const text = parsed.text || ""
  const hexes = (text.match(/#[0-9A-Fa-f]{6}\b/g) || []).map(s => s.toUpperCase())

  const fontsFound = Object.keys(KNOWN_FONTS).filter(name => text.toUpperCase().includes(name))
  const chosenFontKey = fontsFound[0] || "INTER"
  const fontInfo = KNOWN_FONTS[chosenFontKey]

  const { primary, accent, surface, surfaceFg, primaryFg } = pickBrandColors(hexes)

  // Atualizar tailwind.config.ts
  const twPath = path.join(process.cwd(), "tailwind.config.ts")
  if (fs.existsSync(twPath)) {
    let tw = fs.readFileSync(twPath, "utf8")
    const writeKey = (objKey: string, value: string) => {
      // tenta substituir se houver valor placeholder/antigo
      const re1 = new RegExp(`${objKey}\\s*:\\s*["']#?(?:[0-9A-Fa-f]{6}|TODO)["']`, "g")
      if (re1.test(tw)) {
        tw = tw.replace(re1, `${objKey}: "${value}"`)
      } else {
        // injecta no bloco brand se não existir
        tw = tw.replace(/brand\s*:\s*{([\s\S]*?)}/, (m, inner) => {
          const hasComma = inner.trim().length ? "," : ""
          return `brand: {${inner}${hasComma}\n          ${objKey}: "${value}"\n        }`
        })
      }
    }
    writeKey("primary", primary)
    writeKey("primaryFg", primaryFg)
    writeKey("surface", surface)
    writeKey("surfaceFg", surfaceFg)
    writeKey("accent", accent)
    fs.writeFileSync(twPath, tw, "utf8")
    console.log("Updated tailwind.config.ts brand colors:", { primary, primaryFg, surface, surfaceFg, accent })
  }

  // Atualizar src/app/layout.tsx para a fonte detetada (se aplicável)
  const layoutPath = path.join(process.cwd(), "src", "app", "layout.tsx")
  if (fs.existsSync(layoutPath)) {
    let src = fs.readFileSync(layoutPath, "utf8")
    if (!src.includes(fontInfo.import + "(")) {
      // limpar imports next/font/google existentes e usar a fonte escolhida
      src = src
        .replace(/import\s*{[^}]*}\s*from\s*["']next\/font\/google["'];?/g, "")
      src = `import { ${fontInfo.import} } from "${fontInfo.package}"\n` + src
      // substituir a const de fonte
      src = src.replace(
        /const\s+\w+\s*=\s*\w+\([^)]*\)/,
        `const ${fontInfo.varName} = ${fontInfo.import}({ subsets: ["latin"], variable: "--font-${fontInfo.varName}" })`
      )
      // aplicar a variável no <html>
      src = src.replace(
        /<html([^>]*)className=\{[^}]*\}([^>]*)>/,
        `<html$1className={${fontInfo.varName}.variable}$2>`
      )
      fs.writeFileSync(layoutPath, src, "utf8")
      console.log(`Updated layout to use font ${chosenFontKey}`)
    }
  }

  console.log(JSON.stringify({
    pdf: path.relative(process.cwd(), PDF_PATH),
    colors: { primary, primaryFg, surface, surfaceFg, accent },
    font: chosenFontKey
  }, null, 2))
}

main().catch(err => {
  console.error(err)
  process.exit(1 as any)
})
