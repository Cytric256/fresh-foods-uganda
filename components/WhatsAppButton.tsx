"use client";
import { useStore } from "@/lib/store";

export default function WhatsAppButton() {
  const { settings } = useStore();
  const msg = encodeURIComponent("Hello Fresh Foods Uganda, I would like to order fresh foods.");
  const url = `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${msg}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
        <path d="M20.52 3.48A11.9 11.9 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.12.55 4.19 1.6 6.02L0 24l6.13-1.6a11.9 11.9 0 0 0 5.89 1.5h.01c6.62 0 12-5.38 12-12 0-3.2-1.25-6.21-3.51-8.42zM12.03 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.63.95.97-3.54-.23-.37a9.8 9.8 0 0 1-1.5-5.26c0-5.42 4.41-9.83 9.83-9.83 2.62 0 5.08 1.02 6.94 2.88a9.76 9.76 0 0 1 2.87 6.95c0 5.42-4.41 9.8-9.88 9.8zM17.4 14.6c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
      </svg>
    </a>
  );
}