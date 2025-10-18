export const runtime = "nodejs"

import { NextResponse, type NextRequest } from "next/server"

const CLIENT_ID = process.env.GITHUB_CLIENT_ID!
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!

function baseUrl(req: NextRequest) {
  // Vercel define VERCEL_URL sem protocolo
  const vercel = process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`
  const u = new URL(req.url)
  return `${u.protocol}//${u.host}`
}

const AUTHORIZE_URL = "https://github.com/login/oauth/authorize"
const TOKEN_URL = "https://github.com/login/oauth/access_token"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get("action")

  if (action === "authorize" || action === null) {
    const redirect_uri = `${baseUrl(req)}/api/decap/oauth?action=callback`
    const url = new URL(AUTHORIZE_URL)
    url.searchParams.set("client_id", CLIENT_ID)
    url.searchParams.set("redirect_uri", redirect_uri)
    url.searchParams.set("scope", "repo,user:email")
    return NextResponse.redirect(url)
  }

  if (action === "callback") {
    const code = searchParams.get("code")
    if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 })

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    })
    const data = await res.json()
    const token = data.access_token
    if (!token) return NextResponse.json({ error: "OAuth failed", data }, { status: 400 })

    // Entrega o token ao Decap CMS (hash route)
    const admin = `${baseUrl(req)}/admin/#/?token=${token}`
    return NextResponse.redirect(admin)
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}

export const POST = GET
