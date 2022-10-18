import { parseISO } from "date-fns";
import Http, { CONFIG } from "../http";

export type CompanyEventArgs = {
  title: string;
  description: string;
  date: Date;
  registrationOpens: Date;
  registrationCloses: Date;
  maxParticipants: number;
  foodWillBeServed: boolean;
  mailTemplate?: string;
  archived?: boolean;
};

export type CompanyEvent = {
  id: number;
  title: string;
  description: string;
  date: Date;
  registrationOpens: Date;
  registrationCloses: Date;
  maxParticipants: number;
  foodWillBeServed: boolean;
  mailTemplate?: string;
  imageUrl?: string;
};

export type Profile = {
  pictureUrl: string;
  name: string;
  title: string;
  email: string;
  row: number;
};

export type Ticket = {
  name: string;
  email: string;
  foodPreferences: string;
  attended: boolean;
};

export type Registration = {
  id: number;
  name: string;
  email: string;
  foodPreferences: string;
};

export type JobAdArgs = {
  title: string;
  description: string;
  url: string;
  closesOn: Date;
};

export type JobAd = {
  id: number;
  title: string;
  description: string;
  closesOn: Date;
  clicks: number;
  imageUrl: string;
  url: string;
};

const normalizeEvent = (ev: any) => {
  ev.date = parseISO(ev.date);
  ev.registrationOpens = parseISO(ev.registrationOpens);
  ev.registrationCloses = parseISO(ev.registrationCloses);
  return ev;
};

const normalizeJobAd = (ev: any) => {
  ev.closesOn = parseISO(ev.closesOn);
  return ev;
};

export const api = {
  auth: {
    async signIn(password: string) {
      localStorage.setItem("dag-token", btoa(password));
      const res = await Http.get("/auth");
      if (res instanceof Response) {
        return false;
      }
      return true;
    },
  },
  jobs: {
    async create(ev: JobAdArgs): Promise<CompanyEvent> {
      return Http.post("/jobs", { body: ev });
    },
    async update(ev: Partial<JobAdArgs> & { id: number }): Promise<undefined> {
      return Http.patch(`/jobs`, { body: ev });
    },
    async open(): Promise<Array<JobAd>> {
      return (await Http.get("/jobs/open")).map(normalizeJobAd);
    },
    async list(): Promise<Array<JobAd>> {
      return (await Http.get("/jobs")).map(normalizeJobAd);
    },
    async get(id: number): Promise<JobAd> {
      const ev: any = await Http.get(`/jobs/${id}`);
      return normalizeJobAd(ev);
    },
    async uploadImage(
      id: number,
      file: File,
      onProgress?: (progress: number) => void,
      onFinished?: () => void,
    ): Promise<undefined | string> {
      const formData = new FormData();

      if (file.size > 10 * 1000 * 1000) {
        return "File too big";
      }
      formData.append("image", file);

      const request = new XMLHttpRequest();

      request.open("PUT", `${CONFIG.API_URL}/jobs/${id}/image`);
      request.setRequestHeader(
        "Authorization",
        `Token: ${localStorage.getItem("dag-token")}`,
      );
      request.timeout = 300 * 1000;

      let progress = 0;
      request.upload.addEventListener("progress", (e) => {
        if (progress === 100) return;
        progress = e.loaded.div(e.total).mul(100).round();

        if (onProgress) {
          onProgress(progress);
        }
      });

      request.addEventListener("load", () => {
        if (onFinished) {
          onFinished();
        }
      });

      request.send(formData);
      return undefined;
    },
  },
  events: {
    async create(ev: CompanyEventArgs): Promise<CompanyEvent> {
      return Http.post("/events", { body: ev });
    },
    async update(
      ev: Partial<CompanyEventArgs> & { id: number },
    ): Promise<undefined> {
      return Http.patch(`/events`, { body: ev });
    },
    async get(id: number): Promise<CompanyEvent & { tickets: Array<Ticket> }> {
      const ev: any = await Http.get(`/events/${id}`);
      return normalizeEvent(ev);
    },
    async uploadImage(
      id: number,
      file: File,
      onProgress?: (progress: number) => void,
      onFinished?: () => void,
    ): Promise<undefined | string> {
      const formData = new FormData();

      if (file.size > 10 * 1000 * 1000) {
        return "File too big";
      }
      formData.append("image", file);

      const request = new XMLHttpRequest();

      request.open("PUT", `${CONFIG.API_URL}/events/${id}/image`);
      request.setRequestHeader(
        "Authorization",
        `Token: ${localStorage.getItem("dag-token")}`,
      );
      request.timeout = 300 * 1000;

      let progress = 0;
      request.upload.addEventListener("progress", (e) => {
        if (progress === 100) return;
        progress = e.loaded.div(e.total).mul(100).round();

        if (onProgress) {
          onProgress(progress);
        }
      });

      request.addEventListener("load", () => {
        if (onFinished) {
          onFinished();
        }
      });

      request.send(formData);
      return undefined;
    },

    async upcoming(): Promise<Array<CompanyEvent & { tickets: number }>> {
      return (await Http.get("/events/upcoming")).map(normalizeEvent);
    },
    async list(): Promise<Array<CompanyEvent>> {
      return (await Http.get("/events")).map(normalizeEvent);
    },
    async verifyTicket(
      code: string,
    ): Promise<
      { success: boolean; event: string; attendee: string } | Response
    > {
      return Http.post("/events/ticket/verify", { body: { code } });
    },
    async register(registration: Registration): Promise<{ success: boolean }> {
      return Http.post("/events/register", { body: registration });
    },
  },
};
