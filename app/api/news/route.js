import { NextResponse } from "next/server";
import { createNews } from "@/lib/actions/news/createNews";

export async function POST(req) {
  try {
    // Parse body as JSON
    const body = await req.json();
    console.log("Received body:", body);

    const result = await createNews(body);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      { message: result.message, news: result.news },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
