const isProduction = process.env.NODE_ENV === "production";

/**
 * Environment-aware logger for server-side diagnostics.
 *
 * In development, calls forward to the console so debugging still works.
 * In production, only static, non-sensitive labels are emitted — raw error
 * objects, request/response bodies, and stack traces are never logged, so
 * PII, credentials, and internal structure cannot leak via server logs.
 */
export const logger = {
  /** Development-only diagnostics. Produces no output in production. */
  debug(...args: unknown[]) {
    if (!isProduction) {
      console.log(...args);
    }
  },

  /**
   * Always emits a static, non-sensitive label. The raw error object is
   * only forwarded to the console in development.
   */
  error(label: string, err?: unknown) {
    if (!isProduction) {
      console.error(label, err);
      return;
    }

    console.error(label);
  },
};
