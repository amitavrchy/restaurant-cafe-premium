import axios from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export type MenuItem = {
  id: string;
  sectionId: string;
  name: string;
  description: string;
  price: number;
  dietary: string[];
  imageUrl?: string | null;
  available: boolean;
  sortOrder: number;
};

export type MenuSection = {
  id: string;
  slug: string;
  title: string;
  sortOrder: number;
  items: MenuItem[];
};

export type Slot = {
  time: string;
  period: string;
  maxCovers: number;
  booked: number;
  remaining: number;
  available: boolean;
};

export type Availability = {
  date: string;
  closed: boolean;
  reason: string | null;
  slots: Slot[];
};

export type Reservation = {
  id: string;
  code: string;
  date: string;
  time: string;
  partySize: number;
  name: string;
  email: string;
  phone?: string | null;
  notes?: string | null;
  seating?: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "NO_SHOW";
  createdAt: string;
};

export type JournalPost = {
  id: string;
  slug: string;
  title: string;
  body: string;
  coverImage?: string | null;
  publishedAt?: string | null;
};

export async function fetchMenu() {
  const { data } = await api.get<MenuSection[]>("/menu");
  return data;
}

export async function fetchAvailability(date: string) {
  const { data } = await api.get<Availability>("/reservations/availability", {
    params: { date },
  });
  return data;
}

export async function createReservation(payload: {
  date: string;
  time: string;
  partySize: number;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  seating?: string;
}) {
  const { data } = await api.post<Reservation>("/reservations", payload);
  return data;
}

export async function createPrivateInquiry(payload: {
  name: string;
  email: string;
  phone?: string;
  eventDate?: string;
  guests?: number;
  message: string;
}) {
  const { data } = await api.post("/private-inquiries", payload);
  return data;
}

export async function fetchJournal() {
  const { data } = await api.get<JournalPost[]>("/journal");
  return data;
}

export async function fetchJournalPost(slug: string) {
  const { data } = await api.get<JournalPost>(`/journal/${slug}`);
  return data;
}

export async function loginAdmin(email: string, password: string) {
  const { data } = await api.post<{
    accessToken: string;
    user: { id: string; email: string; name: string; role: string };
  }>("/auth/login", { email, password });
  return data;
}

export async function fetchReservations(token: string) {
  const { data } = await api.get<Reservation[]>("/reservations", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function patchReservation(
  token: string,
  id: string,
  status: Reservation["status"],
) {
  const { data } = await api.patch<Reservation>(
    `/reservations/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return data;
}
