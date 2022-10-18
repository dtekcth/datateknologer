type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type Query = Record<string, string | number | undefined | boolean>;

export type JsonPrimitive = string | number | boolean | Date;

export type JsonObject = { [Key in string]?: JsonValue };

export type JsonArray = Array<JsonValue>;

export type JsonValue = JsonPrimitive | JsonArray | JsonObject;

export type JsonResponse = JsonArray | JsonObject;

type Options = {
  query?: Query;
  body?: JsonObject;
  headers?: Record<string, string>;
};

type OptionsWithBody = Options & {
  body?: JsonObject;
};

const shouldUseProductionAPI =
  import.meta.env.MODE === "production" || import.meta.env.MODE === "staging";

export const CONFIG = {
  PUBLIC_URL: shouldUseProductionAPI
    ? "/public"
    : "http://localhost:10016/public",
  API_URL: shouldUseProductionAPI ? "/api/v1" : "http://localhost:10016/api/v1",
};

const createQueryString = (obj: Query) =>
  Object.entries(obj)
    .filter(([, val]) => val !== undefined)
    .map(([key, val]) => `${key}=${encodeURIComponent(String(val))}`)
    .join("&");

const createPath = (path: string, query: Query) => {
  const absolutePath = `/${path}`.replace("//", "/");
  return `${CONFIG.API_URL}${absolutePath}?${createQueryString(query)}`;
};

class Http {
  static async fetch(
    method: Method,
    path: string,
    opts: Options = {},
  ): Promise<Response | any> {
    const { query, body, headers } = {
      query: {},
      headers: {},
      ...opts,
    };

    const token = localStorage.getItem("dag-token");
    if (token !== undefined) {
      headers.Authorization = `Token: ${token}`;
    }

    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(createPath(path, query), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) return res;

    return res.json();
  }

  static async get(path: string, opts?: Options) {
    return Http.fetch("GET", path, opts);
  }

  static async post(path: string, opts?: OptionsWithBody) {
    return Http.fetch("POST", path, opts);
  }

  static async put(path: string, opts?: OptionsWithBody) {
    return Http.fetch("PUT", path, opts);
  }

  static async delete(path: string, opts?: Options) {
    return Http.fetch("DELETE", path, opts);
  }

  static async patch(path: string, opts?: OptionsWithBody) {
    return Http.fetch("PATCH", path, opts);
  }
}
export default Http;
