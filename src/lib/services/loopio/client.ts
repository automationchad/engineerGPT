import axios from "axios";
import { kv } from "@vercel/kv";

const CLIENT_ID = process.env.LOOPIO_CLIENT_ID;
const CLIENT_SECRET = process.env.LOOPIO_CLIENT_SECRET;
const TOKEN_ENDPOINT = "https://api.loopio.com/oauth2/access_token";
const KV_TOKEN_KEY = "loopio_token";

interface Token {
  expiresAt: number;
  accessToken: string;
}

export class LoopioClient {
  constructor() {
    if (process.env.VERCEL_ENV === "production") {
      this.startBackgroundRefresh();
    }
  }

  private async getNewToken() {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      scope: "library:read library:write",
      client_id: CLIENT_ID || "",
      client_secret: CLIENT_SECRET || "",
    });

    const response = await axios.post(TOKEN_ENDPOINT, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token, expires_in } = response.data;

    // Store the token in Vercel KV
    await kv.set(KV_TOKEN_KEY, {
      accessToken: access_token,
      expiresAt: Date.now() + expires_in * 1000, // Convert to milliseconds
    });

    return access_token;
  }

  public async getToken() {
    const cachedToken = await kv.get<Token>(KV_TOKEN_KEY);

    // Check if the token is expired or close to expiring (within 5 minutes)
    if (!cachedToken || Date.now() > cachedToken.expiresAt - 5 * 60 * 1000) {
      return this.getNewToken();
    }
    return cachedToken.accessToken;
  }

  private startBackgroundRefresh() {
    setInterval(async () => {
      try {
        await this.getToken();
        console.log("Token refreshed successfully");
      } catch (error) {
        console.error("Background token refresh failed:", error);
      }
    }, 55 * 60 * 1000); // Refresh every 55 minutes
  }
}
