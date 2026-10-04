import { NextResponse } from "next/server";
import { createNews } from "@/lib/actions/news/createNews";
import { getNews } from "@/lib/actions/news/getNews";

export async function POST(req) {
  try {
    // Parse body as JSON
    const body = await req.json();

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

export async function GET(){
  // fetch news from database
  const news = await getNews();
  return NextResponse.json({ news }, { status: 200 });
}
