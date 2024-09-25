export async function getAccessToken(): Promise<string> {
  const token = process.env.LOOPIO_ACCESS_TOKEN;
  if (!token) {
    throw new Error("Loopio access token is not set");
  }
  return token;
}
