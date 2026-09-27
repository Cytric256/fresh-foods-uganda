export function formatUGX(amount: number): string {
  return "UGX " + new Intl.NumberFormat("en-UG", { maximumFractionDigits: 0 }).format(amount);
}

export function formatPhone(phone: string): string {
  let p = phone.replace(/\s+/g, "");
  if (p.startsWith("0")) p = "+256" + p.slice(1);
  if (p.startsWith("256")) p = "+" + p;
  if (!p.startsWith("+")) p = "+256" + p;
  return p;
}

export function generateBookingRef(): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `FFU-${stamp}-${rand}`;
}