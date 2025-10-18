import fs from "node:fs"
import path from "node:path"

function clamp(v: number, min=0, max=1){ return Math.min(max, Math.max(min, v)) }

function hslToHex(h: number, s: number, l: number) {
  // h in [0..360], s,l in [0..1]
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h/30) % 12
    const c = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))
    const v = Math.round(255 * c)
    return v.toString(16).padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

const STEPS: Record<number, number> = {
  50: 0.98, 100: 0.95, 200: 0.90, 300: 0.82, 400: 0.70,
  500: 0.56, 600: 0.44, 700: 0.34, 800: 0.23, 900: 0.14, 950: 0.06,
}

function buildNeutral() {
  const h = 0, s = 0
  const entries = Object.entries(STEPS).map(([k, l]) => [k, hslToHex(h, s, clamp(l))])
  return Object.fromEntries(entries) as Record<string,string>
}

function patchTailwind(neutral: Record<string,string>) {
  const twPath = path.join(process.cwd(), "tailwind.config.ts")
  if (!fs.existsSync(twPath)) {
    console.error("tailwind.config.ts not found")
    process.exit(1 as any)
  }
  let src = fs.readFileSync(twPath, "utf8")
  let changed = false
  for (const [k, hex] of Object.entries(neutral)) {
    const re = new RegExp(`neutral\\s*:\\s*{[\\s\\S]*?${k}\\s*:\\s*["']#?[0-9A-Fa-f]{3,6}|${k}\\s*:\\s*["']?TODO["']?`, "g")
    // Safer: replace only TODO entries or add keys if missing
    const reTodo = new RegExp(`${k}\\s*:\\s*["']#?TODO["']`, "g")
    if (reTodo.test(src)) {
      src = src.replace(reTodo, `${k}: "${hex}"`)
      changed = true
    } else {
      // inject if key missing entirely
      const blockRe = /neutral\s*:\s*{([\s\S]*?)}/
      if (blockRe.test(src) && !new RegExp(`${k}\\s*:`).test(src)) {
        src = src.replace(blockRe, (m, inner) => {
          const comma = inner.trim().length ? "," : ""
          return `neutral: {${inner}${comma}\n          ${k}: "${hex}"\n        }`
        })
        changed = true
      }
    }
  }
  if (!changed) {
    // brute-force: replace entire neutral block if it contains any TODOs
    const anyTodo = /neutral\s*:\s*{[\s\S]*?TODO[\s\S]*?}/.test(src)
    if (anyTodo) {
      const newBlock = "neutral: {\n" +
        Object.entries(neutral).map(([k,v]) => `          ${k}: "${v}"`).join(",\n") +
        "\n        }"
      src = src.replace(/neutral\s*:\s*{[\s\S]*?}/, newBlock)
      changed = true
    }
  }
  if (changed) fs.writeFileSync(twPath, src, "utf8")
  console.log("Neutral scale:", neutral)
}

const neutral = buildNeutral()
patchTailwind(neutral)
