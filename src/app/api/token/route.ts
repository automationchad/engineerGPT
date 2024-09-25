import { URLSearchParams } from "url";

const LOOPIO_TOKEN_URL = "https://api.loopio.com/oauth2/access_token";
const CLIENT_ID = process.env.LOOPIO_CLIENT_ID;
const CLIENT_SECRET = process.env.LOOPIO_CLIENT_SECRET;
const SCOPE = "library:read library:write project:read project:write project.participant:read";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return new Response("Loopio client credentials are not set", { status: 500 });
  }

  const params = new URLSearchParams({
    grant_type: "client_credentials",
    scope: SCOPE,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  try {
    const response = await fetch(LOOPIO_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = await response.json();

    // Update the environment variable
    await fetch(process.env.VERCEL_API_URL + "/v1/projects/" + process.env.VERCEL_PROJECT_ID + "/env", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: "LOOPIO_ACCESS_TOKEN",
        value: data.access_token,
        type: "encrypted",
        target: ["production", "preview", "development"],
      }),
    });

    return new Response("Token refreshed successfully", { status: 200 });
  } catch (error) {
    console.error("Error refreshing Loopio access token:", error);
    return new Response("Error refreshing token", { status: 500 });
  }
}
