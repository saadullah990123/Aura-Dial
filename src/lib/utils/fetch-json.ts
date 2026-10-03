/**
 * fetch + JSON parsing with a hard timeout, for browser code.
 * The timer covers the whole exchange (connecting AND reading the body), so a stalled
 * connection on a slow network ends with a clear error instead of an endless spinner.
 */
export class RequestTimeoutError extends Error {
  constructor() {
    super("The request timed out.");
    this.name = "RequestTimeoutError";
  }
}

export async function fetchJsonWithTimeout<T = unknown>(
  input: string,
  init: RequestInit,
  timeoutMs = 20_000,
): Promise<{ response: Response; body: T }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(input, { ...init, signal: controller.signal });
    const body = (await response.json().catch((error: unknown) => {
      // A timeout while reading the body must not be mistaken for "empty response".
      if (controller.signal.aborted) throw error;
      return {};
    })) as T;
    return { response, body };
  } catch (error) {
    if (controller.signal.aborted) throw new RequestTimeoutError();
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
