/* Admin-side client for the backend. Auth is the single shared admin
   password, base64-encoded in a nonstandard header — the "Token: "
   prefix is part of the header VALUE. The token is kept in
   localStorage under the same key the old site used ("dag-token"),
   so an existing sign-in carries over across the migration. */

import type { ApiEvent } from "./events";

const API_BASE = import.meta.env.DEV
  ? "http://localhost:10016/api/v1"
  : "/api/v1";

const TOKEN_KEY = "dag-token";

export const hasToken = () => localStorage.getItem(TOKEN_KEY) !== null;
export const signOut = () => localStorage.removeItem(TOKEN_KEY);

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Token: ${localStorage.getItem(TOKEN_KEY) ?? ""}`,
});

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(`${API_BASE}${path}`, init);
  if (!res.ok) {
    throw new Error(`${init?.method ?? "GET"} ${path} failed: ${res.status}`);
  }
  return res.json();
};

/** Stores the password and checks it against /auth; false = rejected. */
export const signIn = async (password: string): Promise<boolean> => {
  localStorage.setItem(TOKEN_KEY, btoa(password));
  try {
    await request("/auth", { headers: headers() });
    return true;
  } catch {
    signOut();
    return false;
  }
};

/** True when a stored token is still accepted by the backend. */
export const checkAuth = async (): Promise<boolean> => {
  if (!hasToken()) return false;
  try {
    await request("/auth", { headers: headers() });
    return true;
  } catch {
    return false;
  }
};

export interface EventArgs {
  title: string;
  description: string;
  /** ISO-8601 strings */
  date: string;
  registrationOpens: string;
  registrationCloses: string;
  maxParticipants: number;
  foodWillBeServed: boolean;
  mailTemplate?: string;
}

export interface AdminTicket {
  name: string;
  email: string;
  foodPreferences: string | null;
  attended: boolean;
}

export const createEvent = (args: EventArgs): Promise<ApiEvent> =>
  request("/events", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(args),
  });

export const updateEvent = (
  args: Partial<EventArgs> & { id: number; archived?: boolean },
): Promise<ApiEvent> =>
  request("/events", {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(args),
  });

/** Archived events disappear from the public site (and this list). */
export const archiveEvent = (id: number): Promise<ApiEvent> =>
  request(`/events/${id}/archive`, { method: "PATCH", headers: headers() });

export const getEventWithTickets = (
  id: number,
): Promise<ApiEvent & { tickets: AdminTicket[] }> =>
  request(`/events/${id}`, { headers: headers() });

/** Sets the event's image — shown as the host-company logo strip at
    the bottom of the event card. Multipart, so no JSON headers here
    (the browser must set the boundary itself). */
export const uploadEventImage = async (
  id: number,
  file: File,
): Promise<ApiEvent> => {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${API_BASE}/events/${id}/image`, {
    method: "PUT",
    headers: {
      Authorization: `Token: ${localStorage.getItem(TOKEN_KEY) ?? ""}`,
    },
    body: form,
  });
  if (!res.ok) {
    throw new Error(`PUT /events/${id}/image failed: ${res.status}`);
  }
  return res.json();
};

export interface VerifyResult {
  success: boolean;
  event?: string;
  attendee?: string;
}

/** Marks the ticket as attended and reports who it belongs to. */
export const verifyTicket = (code: string): Promise<VerifyResult> =>
  request("/events/ticket/verify", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ code }),
  });
