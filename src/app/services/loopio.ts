import { URLSearchParams } from 'url';

const LOOPIO_TOKEN_URL = 'https://api.loopio.com/oauth2/access_token';
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
    return "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIzMGQ4OTVmZWY2NTJjYjAxYzQxMmRhYzU4MzAzNWU5ZDEzODU5Zjk3YjI3OWUzZjNiYjI3YzkyYTFhMjEwM2Y0MWNkOGYxY2QwMWQ3ZDMxMiIsImlhdCI6MTcyNjQ1OTk1Mi4xNDI3MSwibmJmIjoxNzI2NDU5OTUyLjE0MjcxLCJleHAiOjE3MjY0NjM1NTIuMTQyMTYyLCJzdWIiOiJQMTkwY1pSbHBRWjZ1aGVhbVhwQVVia3VadmJrcUVJT2piWllHcHBRWE9zPSIsInNjb3BlcyI6ImxpYnJhcnk6cmVhZCBsaWJyYXJ5OndyaXRlIHByb2plY3Q6cmVhZCBwcm9qZWN0OndyaXRlIHByb2plY3QucGFydGljaXBhbnQ6cmVhZCIsImNsaWVudElkIjoiUDE5MGNaUmxwUVo2dWhlYW1YcEFVYmt1WnZia3FFSU9qYlpZR3BwUVhPcz0iLCJhdWQiOiJhcGkubG9vcGlvLmNvbSIsImlzcyI6ImFwaS5sb29waW8uY29tIiwidXNlcl9wayI6MjM1OTM2LCJjdXN0b21lcl9wayI6NTc3MX0.otBA3zjQr7zq2QDeUwi4DTlQnviNp5FkCVDvo5bKQcakIOfsWLEC6-te61TTi-iS6xj4Vl04SCXdLNniWfI7pirtsibnHVs1csTmkUpj9VYkk5Jf_MMBY04bECcrR2p3rjfckwUpvUj9UckLO_mGIbKSDofJi4A2QQGO-bBr_GHJhJN8DgNkYotxZ-5-P97hjsrxdZFDtPSroruB8HbalgJd4B23ge4oajx_mlaLRw9i-O6vlUih9zhFUuJ_pC4J_tN49cM68AgbKQGZFQq2ZZ1S3ZVrlFDcqNXvAjwpMJzl0naTk-8qGB6VZV6xaQ6fgYp35L9r2pw1e_0jwfK-aQ";
  }

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: SCOPE,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  try {
    const response = await fetch(LOOPIO_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    // if (!response) {
    //   throw new Error(`Failed to get access token: ${response}`);
    // }

    const data: TokenResponse = await response.json();
    cachedToken = data.access_token;
    tokenExpiration = Date.now() + data.expires_in * 1000; // Convert expires_in to milliseconds

    return cachedToken;
  } catch (error) {
    console.error('Error getting Loopio access token:', error);
    throw error;
  }
}
