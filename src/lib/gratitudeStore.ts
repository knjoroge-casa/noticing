export interface GratitudeItem {
  id: string;
  text: string;
  createdAt: string;
}

export interface MonthData {
  key: string; // "2026-03"
  label: string; // "March 2026"
  items: GratitudeItem[];
}

const STORAGE_KEY = "gratitude-items";

function getMonthKey(date: Date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthLabel(key: string): string {
  const [year, month] = key.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getAllItems(): Record<string, GratitudeItem[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAllItems(data: Record<string, GratitudeItem[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addItem(text: string, monthKey?: string): GratitudeItem {
  const key = monthKey || getMonthKey();
  const data = getAllItems();
  const item: GratitudeItem = {
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  };
  data[key] = [...(data[key] || []), item];
  saveAllItems(data);
  return item;
}

export function removeItem(monthKey: string, itemId: string) {
  const data = getAllItems();
  if (data[monthKey]) {
    data[monthKey] = data[monthKey].filter((i) => i.id !== itemId);
    if (data[monthKey].length === 0) delete data[monthKey];
    saveAllItems(data);
  }
}

export function getMonthItems(monthKey?: string): GratitudeItem[] {
  const key = monthKey || getMonthKey();
  return getAllItems()[key] || [];
}

export function getAllMonths(): MonthData[] {
  const data = getAllItems();
  return Object.keys(data)
    .sort((a, b) => b.localeCompare(a))
    .map((key) => ({
      key,
      label: getMonthLabel(key),
      items: data[key],
    }));
}

export function getCurrentMonthKey(): string {
  return getMonthKey();
}

export function getCurrentMonthLabel(): string {
  return getMonthLabel(getMonthKey());
}

export function getMonthLabelFromKey(key: string): string {
  return getMonthLabel(key);
}
