import { NextResponse, NextRequest } from "next/server";
import { getAccessToken } from "@/app/services/loopio";
import { createClient } from "@/utils/supabase/server";

const LOOPIO_API_BASE_URL = "https://api.loopio.com/data/v2";

export async function GET(req: NextRequest, { params }: { params: { project_id: string } }) {
  try {
    
     const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const { project_id } = params;
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "10";

    const accessToken = await getAccessToken();

    const queryParams = new URLSearchParams({
      page,
      pageSize,
      projectId: project_id,
    });

    const response = await fetch(`${LOOPIO_API_BASE_URL}/sections?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // if (!response.ok) {
    //   throw new Error(`Loopio API error: ${response.statusText}`);
    // }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.error("Error fetching sections:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
