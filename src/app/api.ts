import { AuthorizationCode, ModuleOptions } from "simple-oauth2";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import dedent from "dedent";

export function randomState() {
  return randomBytes(6).toString("hex");
}

const {
  OAUTH_CLIENT_ID = "",
  OAUTH_CLIENT_SECRET = "",
  OAUTH_HOST = "https://github.com",
  OAUTH_TOKEN_PATH = "/login/oauth/access_token",
  OAUTH_AUTHORIZE_PATH = "/login/oauth/authorize",
} = process.env;

export const oauthConfig: ModuleOptions = Object.freeze({
  client: Object.freeze({
    id: OAUTH_CLIENT_ID!,
    secret: OAUTH_CLIENT_SECRET,
  }),
  auth: Object.freeze({
    tokenHost: OAUTH_HOST,
    tokenPath: OAUTH_TOKEN_PATH,
    authorizePath: OAUTH_AUTHORIZE_PATH,
  }),
});

/** Render a html response with a script to finish a client-side github authentication */
export function renderResponse(status: "success" | "error", content: any) {
  return dedent`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Authorizing ...</title>
      </head>
      <body>
        <p id="message"></p>
        <script>
          // Output a message to the user
          function sendMessage(message) {
            document.getElementById("message").innerText = message;
            document.title = message
          }
  
          // Handle a window message by sending the auth to the "opener"
          function receiveMessage(message) {
            console.debug("receiveMessage", message);
            window.opener.postMessage(
              'authorization:github:${status}:${JSON.stringify(content)}',
              message.origin
            );
            window.removeEventListener("message", receiveMessage, false);
            sendMessage("Authorized, closing ...");
          }
  
          sendMessage("Authorizing ...");
          window.addEventListener("message", receiveMessage, false);
  
          console.debug("postMessage", "authorizing:github", "*")
          window.opener.postMessage("authorizing:github", "*");
        </script>
      </body>
    </html>
    `;
}

/** An endpoint to start an OAuth2 authentication */
export function auth(req: NextRequest) {
  const host = req.headers.get("host");

  console.log("auth host=%o", host);

  console.log({ oauthConfig });

  const authorizationCode = new AuthorizationCode(oauthConfig);

  console.log({ authorizationCode });

  const url = authorizationCode.authorizeURL({
    redirect_uri: `https://${host}/api/callback`,
    scope: `repo,user`,
    state: randomState(),
  });

  return NextResponse.redirect(url, 301);
}

/** An endpoint to finish an OAuth2 authentication */
export async function callback(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code") as string;
    const host = req.headers.get("host");

    console.log({ code, searchParams });
    console.log({ nextUrl: req.nextUrl });

    const authorizationCode = new AuthorizationCode(oauthConfig);

    const accessToken = await authorizationCode.getToken({
      code,
      redirect_uri: `http://${host}/api/callback`,
    });

    console.log({ accessToken });

    console.debug("callback host=%o", host);

    const { token } = authorizationCode.createToken(accessToken.token);

    console.log({ token });

    return new Response(
      renderResponse("success", {
        token: token.access_token,
        provider: "github",
      }),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }
    );
  } catch (e) {
    return new Response(renderResponse("error", e), {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  }
}
