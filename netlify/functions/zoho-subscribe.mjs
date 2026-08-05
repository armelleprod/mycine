const JSON_HEADERS = {
  "Content-Type":"application/json; charset=utf-8",
  "Cache-Control":"no-store"
};

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers:JSON_HEADERS
  });
}

function requiredEnvironment() {
  const values = {
    clientId:Netlify.env.get("ZOHO_CLIENT_ID"),
    clientSecret:Netlify.env.get("ZOHO_CLIENT_SECRET"),
    refreshToken:Netlify.env.get("ZOHO_REFRESH_TOKEN"),
    listKey:Netlify.env.get("ZOHO_MYCINE_LIST_KEY")
  };

  const missing = Object.entries(values)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  return {values, missing};
}

function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const configured = Netlify.env.get("MYCINE_ALLOWED_ORIGIN");
  const allowed = new Set([
    "https://mycine.netlify.app",
    "http://localhost:8888",
    "http://localhost:5173",
    ...(configured ? configured.split(",").map(value => value.trim()) : [])
  ]);

  return allowed.has(origin);
}

function validEmail(value) {
  return typeof value === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
    value.length <= 254;
}

async function getAccessToken({clientId, clientSecret, refreshToken}) {
  const accountsDomain =
    Netlify.env.get("ZOHO_ACCOUNTS_DOMAIN") || "https://accounts.zoho.com";

  const body = new URLSearchParams({
    refresh_token:refreshToken,
    client_id:clientId,
    client_secret:clientSecret,
    grant_type:"refresh_token"
  });

  const response = await fetch(`${accountsDomain}/oauth/v2/token`, {
    method:"POST",
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body
  });

  const payload = await response.json();

  if (!response.ok || !payload.access_token) {
    console.error("Zoho token refresh failed", {
      status:response.status,
      error:payload.error,
      errorDescription:payload.error_description
    });
    throw new Error("ZOHO_AUTH_FAILED");
  }

  return {
    accessToken:payload.access_token
  };
}

async function subscribeContact({accessToken, listKey, email, source}) {
  const campaignsDomain =
    Netlify.env.get("ZOHO_CAMPAIGNS_DOMAIN") ||
    "https://campaigns.zoho.com";
  const contactInfo = JSON.stringify({"Contact Email":email});
  const body = new URLSearchParams({
    resfmt:"JSON",
    listkey:listKey,
    contactinfo:contactInfo,
    source:source || "My Cine App"
  });

  const response = await fetch(
    `${campaignsDomain}/api/v1.1/json/listsubscribe`,
    {
      method:"POST",
      headers:{
        "Authorization":`Zoho-oauthtoken ${accessToken}`,
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body
    }
  );

  const text = await response.text();
  let payload;

  try {
    payload = JSON.parse(text);
  } catch {
    payload = {message:text};
  }

  console.log("Zoho subscribe response", {
    status:response.status,
    code:payload?.code,
    message:payload?.message,
    url:payload?.url
  });

  if (!response.ok) {
    console.error("Zoho subscribe HTTP error", {
      status:response.status,
      code:payload?.code,
      message:payload?.message,
      url:payload?.url
    });
    throw new Error("ZOHO_SUBSCRIBE_FAILED");
  }

  const success =
    String(payload.code) === "0" ||
    String(payload.status).toLowerCase() === "success";

  if (!success) {
    const message = String(payload.message || "");
    const duplicate =
      /already|exist|duplicate|subscribed/i.test(message);

    if (duplicate) {
      return {
        ok:true,
        confirmationRequired:false,
        message:"This email is already connected to The My Ciné Letter."
      };
    }

    console.error("Zoho subscribe API error", {
      code:payload.code,
      message:payload.message
    });
    throw new Error("ZOHO_SUBSCRIBE_REJECTED");
  }

  return {
    ok:true,
    confirmationRequired:/confirmation/i.test(String(payload.message || "")),
    message:
      payload.message ||
      "Zoho accepted the subscription request."
  };
}

export default async request => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status:204,
      headers:{
        ...JSON_HEADERS,
        "Access-Control-Allow-Origin":
          request.headers.get("origin") || "https://mycine.netlify.app",
        "Access-Control-Allow-Methods":"POST, OPTIONS",
        "Access-Control-Allow-Headers":"Content-Type"
      }
    });
  }

  if (request.method !== "POST") {
    return json(405, {
      ok:false,
      message:"Method not allowed."
    });
  }

  if (!isAllowedOrigin(request)) {
    return json(403, {
      ok:false,
      message:"This signup request was blocked."
    });
  }

  const {values, missing} = requiredEnvironment();
  if (missing.length) {
    console.error("Missing Zoho environment variables", missing);
    return json(500, {
      ok:false,
      message:"The My Ciné Letter is still being connected. Please try again shortly."
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, {
      ok:false,
      message:"Invalid signup request."
    });
  }

  // Honeypot: behave like success without touching Zoho.
  if (body.website) {
    return json(200, {
      ok:true,
      confirmationRequired:false,
      message:"Thank you."
    });
  }

  const email = String(body.email || "").trim().toLowerCase();
  if (!validEmail(email)) {
    return json(400, {
      ok:false,
      message:"Please enter a valid email address."
    });
  }

  try {
    const {accessToken} = await getAccessToken(values);
    const result = await subscribeContact({
      accessToken,
      listKey:values.listKey,
      email,
      source:"My Cine App"
    });

    return json(200, result);
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";

    const publicMessage =
      code === "ZOHO_AUTH_FAILED"
        ? "The My Ciné Letter connection needs attention. Please try again later."
        : "Our projectionist dropped the film reel. Please try again in a moment. 🍿";

    return json(502, {
      ok:false,
      message:publicMessage
    });
  }
};
