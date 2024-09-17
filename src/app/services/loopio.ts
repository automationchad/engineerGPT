import { URLSearchParams } from "url";

const LOOPIO_TOKEN_URL = "https://api.loopio.com/oauth2/access_token";
const CLIENT_ID = process.env.LOOPIO_CLIENT_ID;
const CLIENT_SECRET = process.env.LOOPIO_CLIENT_SECRET;
const SCOPE = "library:read library:write project:read project:write project.participant:read";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

let cachedToken: string | null = null;
let tokenExpiration: number | null = null;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && tokenExpiration && Date.now() < tokenExpiration) {
    return cachedToken;
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Loopio client credentials are not set");
  }

  const params = new URLSearchParams({
    grant_type: "client_credentials",
    scope: SCOPE,
    client_id: CLIENT_ID!,
    client_secret: CLIENT_SECRET!,
  });

  try {
    const response = await fetch(LOOPIO_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response) {
      throw new Error(`Failed to get access token: ${response}`);
    }

    const data: TokenResponse = await response.json();
    cachedToken = data.access_token;
    tokenExpiration = Date.now() + data.expires_in * 1000; // Convert expires_in to milliseconds

    return cachedToken;
  } catch (error) {
    console.error("Error getting Loopio access token:", error);
    throw error;
  }
}
