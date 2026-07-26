import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';
import { NextResponse } from 'next/server';

// dsebd.org serves an incomplete TLS chain (missing intermediate cert),
// so Node rejects it by default even though browsers tolerate it.
const agent = new https.Agent({ rejectUnauthorized: false });

export async function GET() {
  try {
    const res = await axios.get("https://www.dsebd.org/", {
      httpsAgent: agent,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 15000, // dsebd.org can be slow; give it more room than the axios default
    });

    if (!res.data || typeof res.data !== 'string') {
      return NextResponse.json({ error: "Empty response from DSE" }, { status: 502 });
    }

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

    const rawString = match[1]
      .replace(/"\s*\+\s*"/g, "")  // remove concatenation
      .replace(/(^"|"$)/g, "")     // remove leading/trailing quotes
      .replace(/\\n/g, "\n");      // convert literal \n to newline

    const dataArray = rawString
      .split("\n")
      .map(line => {
        const [time, value] = line.split(",");
        if (!time || !value) return null;
        const parsed = parseFloat(value);
        if (isNaN(parsed)) return null;
        return { time: time.trim(), value: parsed };
      })
      .filter(Boolean);

    if (dataArray.length === 0) {
      return NextResponse.json({ error: "Parsed DSEX data is empty" }, { status: 404 });
    }
    return NextResponse.json(dataArray);

  } catch (err) {
    console.error("Error fetching DSE index:", err.message);

    // Distinguish timeouts from other failures so the client gets a clearer signal
    if (err.code === 'ECONNABORTED') {
      return NextResponse.json(
        { error: "DSE request timed out", detail: err.message },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch DSE index", detail: err.message },
      { status: 500 }
    );
  }
}