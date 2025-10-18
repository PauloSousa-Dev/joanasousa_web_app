import { NextRequest, NextResponse } from "next/server"

function html(body: string) {
  return new Response(body, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const action = url.searchParams.get("action")
  const clientId = process.env.GITHUB_CLIENT_ID!
  const clientSecret = process.env.GITHUB_CLIENT_SECRET!
  const redirectUri =
    process.env.OAUTH_REDIRECT_URI ||
    `${url.origin}/api/decap/oauth?action=callback`
  const scope = process.env.OAUTH_SCOPE || "repo,user:email"

  if (action === "authorize") {
    const state = crypto.randomUUID()
    const authUrl = new URL("https://github.com/login/oauth/authorize")
    authUrl.searchParams.set("client_id", clientId)
    authUrl.searchParams.set("redirect_uri", redirectUri)
    authUrl.searchParams.set("scope", scope)
    authUrl.searchParams.set("state", state)
    return NextResponse.redirect(authUrl)
  }

  if (action === "callback") {
    const code = url.searchParams.get("code") || ""
    const resp = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    })
    const data = await resp.json()
    const token = data.access_token || ""
    const page = `
<!doctype html><html><body>
<script>
  (function(){
    function send(msg){ if (window.opener && !window.opener.closed) { window.opener.postMessage(msg, "*"); } }
    var token = ${JSON.stringify(token)};
    if(token){ send({ token: token, provider: "github" }); }
    window.close();
  })();
</script>
Fechar esta janela.
</body></html>`
    return html(page)
  }

  if (action === "token") {
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 })
}
