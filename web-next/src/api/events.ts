/* Read-side API client for the datateknologer backend (not modifiable).
   GET /events is public and returns all non-archived events ascending
   by date — upcoming/past splitting happens client-side. */

const API_BASE = import.meta.env.DEV
  ? "http://localhost:10016/api/v1"
  : "/api/v1";

const PUBLIC_BASE = import.meta.env.DEV
  ? "http://localhost:10016/public"
  : "/public";

export interface ApiEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  maxParticipants: number;
  registrationOpens: string;
  registrationCloses: string;
  imageUrl: string | null;
  foodWillBeServed: boolean;
  archived: boolean;
  mailTemplate: string | null;
  /** only present on /events/upcoming */
  tickets?: number;
}

export const fetchEvents = async (): Promise<ApiEvent[]> => {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error(`GET /events failed: ${res.status}`);
  return res.json();
};

export interface ApiIssue {
  code: string;
  message: string;
}

export interface EventRegistration {
  eventId: number;
  name: string;
  email: string;
  foodPreferences: string | null;
  timestamp: string;
  verificationCode: string;
  attended: boolean;
}

/* the backend reports failures as a BARE array of { code, message }
   (e.g. ALREADY_REGISTERED, MAX_PARTICIPANTS_REACHED) with HTTP 400,
   and an unknown event id as HTTP 200 with `{}` */
export class RegisterError extends Error {
  issues: ApiIssue[];

  constructor(issues: ApiIssue[]) {
    super(issues[0]?.message ?? "Registration failed");
    this.issues = issues;
  }

  has(code: string) {
    return this.issues.some((i) => i.code === code);
  }
}

export const registerForEvent = async (body: {
  id: number;
  name: string;
  email: string;
  foodPreferences?: string;
}): Promise<EventRegistration> => {
  const res = await fetch(`${API_BASE}/events/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new RegisterError(Array.isArray(data) ? data : []);
  }
  if (!data || typeof data.verificationCode !== "string") {
    throw new RegisterError([
      { code: "NOT_FOUND", message: "Event not found" },
    ]);
  }
  return data as EventRegistration;
};

export const publicImage = (path: string) => `${PUBLIC_BASE}/${path}`;
