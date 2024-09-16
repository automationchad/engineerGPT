import { NextResponse, NextRequest } from "next/server";
import { getAccessToken } from "@/app/services/loopio"; // Assume this function exists to get the access token
import { createClient } from "@/utils/supabase/server";

const LOOPIO_API_BASE_URL = "https://api.loopio.com/data/v2";

export async function GET(req: NextRequest, { params }: { params: { project_id: string } }) {
  try {
    const { project_id } = params;
    const accessToken = await getAccessToken();
    console.log("Access Token", accessToken);
    const { searchParams } = new URL(req.url);

    const fields = searchParams.get("fields") || "@narrow";

    const response = await fetch(`${LOOPIO_API_BASE_URL}/projects/${project_id}?fields=${fields}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Accept": "application/json",
      },
    });

    // if (!response.ok) {
    //   throw new Error(`Loopio API error: ${response.statusText}`);
    // }

    const data = await response.json();

    console.log("Data", data);

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.error("Error fetching project:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
