const JSON_HEADERS = {
  "Content-Type":"application/json; charset=utf-8",
  "Cache-Control":"no-store"
};

function env(name) {
  return Netlify.env.get(name);
}

function htmlPage({title, body, tone = "normal"}) {
  const accent = tone === "error" ? "#FF7A7A" : "#FFB800";

  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  <style>
    :root{
      color-scheme:dark;
      --red:#E50914;
      --dark-red:#B0001A;
      --gold:#FFB800;
      --navy:#0B1F4A;
      --card:#162D60;
      --white:#FFFFFF;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      min-height:100vh;
      display:grid;
      place-items:center;
      padding:24px;
      font-family:Inter,Arial,sans-serif;
      color:var(--white);
      background:
        radial-gradient(circle at 50% 0%,rgba(255,184,0,.20),transparent 34%),
        linear-gradient(145deg,var(--dark-red),var(--red));
    }
    main{
      width:min(760px,100%);
      padding:clamp(28px,6vw,56px);
      text-align:center;
      background:linear-gradient(150deg,var(--card),var(--navy));
      border:2px solid var(--gold);
      border-radius:28px;
      box-shadow:0 34px 90px rgba(0,0,0,.48);
    }
    .icon{font-size:48px;margin-bottom:12px}
    .kicker{
      color:var(--gold);
      font-size:12px;
      font-weight:900;
      letter-spacing:.15em;
    }
    h1{
      margin:12px 0 18px;
      font-family:Georgia,serif;
      font-size:clamp(30px,6vw,48px);
      line-height:1.08;
    }
    p{font-size:17px;line-height:1.65;color:rgba(255,255,255,.84)}
    .token{
      width:100%;
      min-height:110px;
      margin:18px 0;
      padding:16px;
      resize:vertical;
      border:2px solid ${accent};
      border-radius:14px;
      background:#071632;
      color:#FFFFFF;
      font:14px/1.5 Consolas,monospace;
    }
    button,a.button{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:48px;
      margin:6px;
      padding:0 22px;
      border:0;
      border-radius:12px;
      color:var(--navy);
      background:var(--gold);
      font-weight:900;
      text-decoration:none;
      cursor:pointer;
    }
    .secondary{
      color:#FFFFFF!important;
      background:transparent!important;
      border:1px solid rgba(255,255,255,.45)!important;
    }
    .warning{
      margin-top:18px;
      padding:14px;
      border-radius:12px;
      background:rgba(229,9,20,.18);
      color:#FFD7D7;
      font-size:14px;
    }
    code{
      color:var(--gold);
      font-family:Consolas,monospace;
    }
  </style>
</head>
<body>
  <main>
    ${body}
  </main>
</body>
</html>`, {
    status:tone === "error" ? 400 : 200,
    headers:{
      "Content-Type":"text/html; charset=utf-8",
      "Cache-Control":"no-store"
    }
  });
}

function errorPage(message, detail = "") {
  return htmlPage({
    title:"My Ciné • Zoho Connection",
    tone:"error",
    body:`
      <div class="icon">🎬</div>
      <div class="kicker">MY CINÉ LETTER</div>
      <h1>Connection paused.</h1>
      <p>${message}</p>
      ${detail ? `<div class="warning">${detail}</div>` : ""}
      <a class="button" href="/admin.html">Try again</a>
    `
  });
}

function getConfiguration(request) {
  const clientId = env("ZOHO_CLIENT_ID");
  const clientSecret = env("ZOHO_CLIENT_SECRET");
  const accountsDomain =
    env("ZOHO_ACCOUNTS_DOMAIN") || "https://accounts.zoho.com";
  const redirectUri =
    env("ZOHO_REDIRECT_URI") ||
    new URL("/.netlify/functions/zoho-auth", request.url).toString();

  const missing = [];
  if (!clientId) missing.push("ZOHO_CLIENT_ID");
  if (!clientSecret) missing.push("ZOHO_CLIENT_SECRET");

  return {
    clientId,
    clientSecret,
    accountsDomain,
    redirectUri,
    missing
  };
}

async function exchangeAuthorizationCode({
  code,
  clientId,
  clientSecret,
  redirectUri,
  accountsDomain
}) {
  const body = new URLSearchParams({
    grant_type:"authorization_code",
    client_id:clientId,
    client_secret:clientSecret,
    redirect_uri:redirectUri,
    code
  });

  const response = await fetch(`${accountsDomain}/oauth/v2/token`, {
    method:"POST",
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body
  });

  const raw = await response.text();
  let payload;

  try {
    payload = JSON.parse(raw);
  } catch {
    throw new Error(
      `Zoho returned an unexpected HTML response. Confirm that the redirect URI is identical in Zoho and Netlify. HTTP ${response.status}.`
    );
  }

  if (!response.ok || payload.error || !payload.refresh_token) {
    const reason =
      payload.error_description ||
      payload.error ||
      "Zoho did not return a refresh token.";

    throw new Error(reason);
  }

  return payload;
}

export default async request => {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({
      ok:false,
      message:"Method not allowed."
    }), {
      status:405,
      headers:JSON_HEADERS
    });
  }

  const url = new URL(request.url);
  const configuration = getConfiguration(request);

  if (configuration.missing.length) {
    return errorPage(
      "The OAuth client is not ready in Netlify.",
      `Add these Function-scoped environment variables first: <code>${configuration.missing.join(", ")}</code>.`
    );
  }

  const oauthError = url.searchParams.get("error");
  if (oauthError) {
    return errorPage(
      "Zoho did not authorize the connection.",
      oauthError
    );
  }

  const code = url.searchParams.get("code");

  // No code: begin OAuth.
  if (!code) {
    const authorizationUrl = new URL(
      `${configuration.accountsDomain}/oauth/v2/auth`
    );

    authorizationUrl.search = new URLSearchParams({
      scope:"ZohoCampaigns.contact.UPDATE",
      client_id:configuration.clientId,
      response_type:"code",
      access_type:"offline",
      redirect_uri:configuration.redirectUri,
      prompt:"consent"
    }).toString();

    return Response.redirect(authorizationUrl.toString(), 302);
  }

  try {
    const tokenPayload = await exchangeAuthorizationCode({
      code,
      ...configuration
    });

    const refreshToken = tokenPayload.refresh_token;

    return htmlPage({
      title:"My Ciné • Zoho Connected",
      body:`
        <div class="icon">🎬</div>
        <div class="kicker">MY CINÉ LETTER</div>
        <h1>Zoho authorized My Ciné.</h1>
        <p>
          Copy the refresh token below and save it in Netlify as
          <code>ZOHO_REFRESH_TOKEN</code> with <strong>Functions</strong> scope.
        </p>

        <textarea
          id="refresh-token"
          class="token"
          readonly
          spellcheck="false"
        >${refreshToken}</textarea>

        <button type="button" onclick="copyToken()">Copy refresh token</button>
        <a class="button secondary" href="/admin.html">Back to setup</a>

        <div class="warning">
          This token is shown only on this page. Do not paste it into chat,
          email, GitHub, App.jsx, or screenshots.
        </div>

        <script>
          async function copyToken(){
            const field = document.getElementById("refresh-token");
            field.select();
            field.setSelectionRange(0, field.value.length);

            try{
              await navigator.clipboard.writeText(field.value);
              event.currentTarget.textContent = "Copied ✓";
            }catch{
              document.execCommand("copy");
              event.currentTarget.textContent = "Copied ✓";
            }
          }
        </script>
      `
    });
  } catch (error) {
    return errorPage(
      "Zoho could not exchange the authorization code.",
      error instanceof Error ? error.message : "Unknown OAuth error."
    );
  }
};
