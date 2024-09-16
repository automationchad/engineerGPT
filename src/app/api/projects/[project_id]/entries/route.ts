import { NextResponse, NextRequest } from "next/server";
import { getAccessToken } from "@/app/services/loopio"; // Assume this function exists to get the access token
import { createClient } from "@/utils/supabase/server";

const LOOPIO_API_BASE_URL = "https://api.loopio.com/data/v2";

export async function GET(req: NextRequest, { params }: { params: { project_id: string } }) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const {
      data: { loopio_id },
    } = await supabase.from("users").select("loopio_id").eq("id", user?.id).single();

    const { project_id } = params;
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || 1;
    const pageSize = searchParams.get("pageSize") || 100;

    const accessToken = await getAccessToken();

    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      projectId: project_id,
      // sectionId,
      // subSectionId,
    });

    console.log("Query Params:", queryParams);

    const response = await fetch(`${LOOPIO_API_BASE_URL}/projectEntries?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Loopio API error: ${response.statusText}`);
    }

    const data = await response.json();

    const filteredItems = data.items
    // .filter((item: any) => item.assignee.id === loopio_id);

    const filteredData = {
      items: filteredItems,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
    };

    return NextResponse.json(filteredData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.error("Error fetching project entries:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { project_id: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const projectEntryId = searchParams.get("projectEntryId");

    if (!projectEntryId) {
      return NextResponse.json({ error: "projectEntryId is required" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const body = await req.json();

    const response = await fetch(`${LOOPIO_API_BASE_URL}/projectEntries/${projectEntryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Loopio API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.error("Error updating project entry:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Add OPTIONS method to handle CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
