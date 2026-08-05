import readline from "node:readline/promises";
import process from "node:process";

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

console.log("\nMY CINÉ • Zoho Refresh Token Setup\n");
console.log("Your values stay inside this terminal session and are not saved.\n");

const clientId = (await rl.question("Zoho Client ID: ")).trim();
const clientSecret = (await rl.question("Zoho Client Secret: ")).trim();
const authorizationCode = (await rl.question("Fresh authorization code: ")).trim();
const redirectUri = (
  await rl.question(
    "Redirect URI [https://mycine.netlify.app]: "
  )
).trim() || "https://mycine.netlify.app";

rl.close();

if (!clientId || !clientSecret || !authorizationCode) {
  console.error("\nMissing required value. Nothing was sent.");
  process.exit(1);
}

const body = new URLSearchParams({
  grant_type:"authorization_code",
  client_id:clientId,
  client_secret:clientSecret,
  redirect_uri:redirectUri,
  code:authorizationCode
});

const response = await fetch("https://accounts.zoho.com/oauth/v2/token", {
  method:"POST",
  headers:{"Content-Type":"application/x-www-form-urlencoded"},
  body
});

const payload = await response.json();

if (!response.ok || !payload.refresh_token) {
  console.error("\nZoho did not return a refresh token.");
  console.error(payload);
  console.error(
    "\nGenerate a fresh authorization code and confirm the Redirect URI is identical."
  );
  process.exit(1);
}

console.log("\nSUCCESS 🎬");
console.log("\nCopy ONLY this refresh token into Netlify as ZOHO_REFRESH_TOKEN:\n");
console.log(payload.refresh_token);
console.log("\nDo not send it by email or paste it into chat/GitHub.\n");
