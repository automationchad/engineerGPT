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
    return "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI4MmQwYmQ2NDdhMjc3NzcyYjY2Mzg2ZDkyZTdmMWQyOWE3OGI4NGI4YWU5OTNhODE1MzA5YjViNzEyM2Q0ZTI1YWRlNzliYzFmZTE2YWJhNyIsImlhdCI6MTcyNjUzNTY5Mi4zNzcyOTksIm5iZiI6MTcyNjUzNTY5Mi4zNzcyOTksImV4cCI6MTcyNjUzOTI5Mi4zNzY3MTcsInN1YiI6IlAxOTBjWlJscFFaNnVoZWFtWHBBVWJrdVp2YmtxRUlPamJaWUdwcFFYT3M9Iiwic2NvcGVzIjoibGlicmFyeTpyZWFkIGxpYnJhcnk6d3JpdGUgcHJvamVjdDpyZWFkIHByb2plY3Q6d3JpdGUgcHJvamVjdC5wYXJ0aWNpcGFudDpyZWFkIiwiY2xpZW50SWQiOiJQMTkwY1pSbHBRWjZ1aGVhbVhwQVVia3VadmJrcUVJT2piWllHcHBRWE9zPSIsImF1ZCI6ImFwaS5sb29waW8uY29tIiwiaXNzIjoiYXBpLmxvb3Bpby5jb20iLCJ1c2VyX3BrIjoyMzU5MzYsImN1c3RvbWVyX3BrIjo1NzcxfQ.L9L_BTuWTAWVe5G-X4OCL9Oiz43HS1AKM0t211txKPIl9sVgn1h1VW4nPmukZxpgAlkBKDM48KLs7meeSMBdN7I3wPoEPLXyQi8-Iy8WpwrPm4XiO62-mm3VHslL4T2NNa7yWuf4qWZZqXxI-4xrfhrI_5Y-tKYKWfK-FYPrN2WQbuwIyoHBhvyWYJN0eEhYSJDKUf7e9H7JpP5y9sGNZEjwBMle-oZx92HRtoPfQosi8zqQ_xuTBtFOEhVDPIk6J8sh8exnEnn-r3oWnL76YKVN_MBug_NO-qYA7vjvdz_3D0dQJaMxb5DMFNFfO7ZhVRa9KFc-habuhlaQ0ImGmA";
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
