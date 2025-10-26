import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await axios.get("https://www.dsebd.org/");
    const $ = cheerio.load(res.data);

    const scripts = $("script").map((i, el) => $(el).html()).get();
    const dataScript = scripts.find(s => s && s.includes("Dygraph"));

    if (!dataScript) {
      return NextResponse.json({ error: "DSE data not found" }, { status: 404 });
    }

    const match = dataScript.match(/var\s+index_value_dsbi\s*=\s*((?:"[^"]*"\s*\+\s*)*"[^"]*")/s);
    if (!match) {
      return NextResponse.json({ error: "DSEX index not found in script" }, { status: 404 });
    }

    let rawString = match[1]
      .replace(/"\s*\+\s*"/g, "")  // remove concatenation
      .replace(/(^"|"$)/g, "")     // remove leading/trailing quotes
      .replace(/\\n/g, "\n");      // convert literal \n to newline

    const dataArray = rawString.split("\n").map(line => {
      const [time, value] = line.split(",");
      if (!time || !value) return null;
      return {
        time: time.trim(),
        value: parseFloat(value)
      };
    }).filter(Boolean);

    return NextResponse.json(dataArray);
  } catch (err) {
    console.error("Error fetching DSE index:", err);
    return NextResponse.json({ error: "Failed to fetch DSE index" }, { status: 500 });
  }
}
