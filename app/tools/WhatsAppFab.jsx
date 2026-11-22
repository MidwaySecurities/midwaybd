import { Icon } from "./icons";
import { waProps } from "./whatsapp";

/** Round WhatsApp button, desktop only (the phone has the sticky bar). One per page. */
export function WhatsAppFab({ pageKey, title }) {
  return (
    <a
      {...waProps(null, pageKey, "desktop_fab", title)}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-20 hidden h-14 w-14 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-lg md:flex"
    >
      <Icon name="whatsapp" className="h-7 w-7" />
    </a>
  );
}
