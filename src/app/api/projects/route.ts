"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { getAccessToken } from "@/app/services/loopio";

// Initialize Supabase client

export async function GET(request: Request) {
  const supabase = createClient();

  try {
    // Get the user's session from Supabase Auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user's loopio_id from your database
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("loopio_id")
      .eq("id", user.id)
      .single();

    if (userError || !userData?.loopio_id) {
      return NextResponse.json({ error: "User not found or missing Loopio ID" }, { status: 404 });
    }

    // Fetch projects from Loopio API
    const loopioApiUrl = "https://api.loopio.com/data/v2/projects";
    const accessToken = await getAccessToken();
    const { items: projects } = await fetch(loopioApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());

    // if (!projects.ok) {
    //   throw new Error(`Loopio API error: ${projects.statusText}`);
    // }

    // const filteredProjects = projects.filter((v: any) => v.status === "ACTIVE");

    // Filter projects based on user participation
    const filteredProjects = 
      projects
        .filter((v: any) => v.status === "ACTIVE")
        // .map(async (project: any) => {
        //   const participantsUrl = `${loopioApiUrl}/${project.id}/participants`;
        //   const participantsResponse = await fetch(participantsUrl, {
        //     headers: {
        //       Accept: "application/json",
        //       Authorization: `Bearer ${accessToken}`,
        //     },
        //   }).then((res) => res.json());

        //   console.log("Participants Response:", participantsResponse.body);

        //   const participants = await participantsResponse.json();
        //   const isParticipant = participants.body.some((p: any) => p.type === "USER" && p.id === userData.loopio_id);

        //   return isParticipant ? project : null;
        // })

    const userProjects = filteredProjects.filter(Boolean);

    return NextResponse.json(userProjects);
  } catch (error) {
    console.error("Error in GET /api/projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
