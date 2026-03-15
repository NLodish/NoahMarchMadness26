import { QueryClient, QueryFunction } from "@tanstack/react-query";

const API_BASE = "__PORT_5000__".startsWith("__") ? "" : "__PORT_5000__";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * Flexible apiRequest — supports two calling conventions:
 * 1. apiRequest(url)                             → GET
 * 2. apiRequest(url, { method, body, headers })  → any method
 * 3. apiRequest(method, url, data)               → legacy form
 */
export async function apiRequest(
  urlOrMethod: string,
  urlOrOptions?: string | RequestInit,
  data?: unknown,
): Promise<any> {
  let method: string;
  let url: string;
  let body: BodyInit | undefined;
  let headers: HeadersInit = {};

  if (typeof urlOrOptions === "string") {
    // Legacy: apiRequest("POST", "/api/foo", data)
    method = urlOrMethod;
    url = urlOrOptions;
    if (data) {
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify(data);
    }
  } else if (urlOrOptions && typeof urlOrOptions === "object") {
    // New: apiRequest("/api/foo", { method: "POST", body: "..." })
    url = urlOrMethod;
    method = urlOrOptions.method || "GET";
    body = urlOrOptions.body as BodyInit | undefined;
    headers = urlOrOptions.headers || {};
    if (body && typeof body === "string" && !(headers as Record<string, string>)["Content-Type"]) {
      (headers as Record<string, string>)["Content-Type"] = "application/json";
    }
  } else {
    // Simple: apiRequest("/api/foo")
    url = urlOrMethod;
    method = "GET";
  }

  const res = await fetch(`${API_BASE}${url}`, { method, headers, body });
  await throwIfResNotOk(res);

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(`${API_BASE}${queryKey[0]}`);

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
