import Tabs from "../../components/Tabs";
import styles from "./Tabs.module.css";

const tabs = [
  { id: "london", label: "London", content: "London is the capital city of England." },
  { id: "paris", label: "Paris", content: "Paris is the capital of France." },
  { id: "tokyo", label: "Tokyo", content: "Tokyo is the capital of Japan." },
];

export default function CityPage({ params }) {
  const city = params.city?.toLowerCase();
  const activeTab = tabs.find((t) => t.id === city) || tabs[0];

  return (
    <div style={{ fontFamily: "Arial" }}>
      <p>Each city has its own URL and is rendered on the server for SEO.</p>
      <Tabs activeCity={activeTab.id} />

      <div className={styles.tabcontent}>
        <h3>{activeTab.label}</h3>
        <p>{activeTab.content}</p>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const titles = {
    london: "London - Capital of England",
    paris: "Paris - Capital of France",
    tokyo: "Tokyo - Capital of Japan",
  };
  const city = params.city?.toLowerCase();
  return {
    title: titles[city] || "City",
    description: `Information about ${city || "the city"}`,
  };
}
