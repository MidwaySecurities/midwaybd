import { buildGraph, graphToString } from "./structured-data";

/** Renders the page's JSON-LD. Render it on the SERVER (it is plain markup), never inject it client-side only. */
export function JsonLd({ content, site }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graphToString(buildGraph(content, site)) }} />;
}
