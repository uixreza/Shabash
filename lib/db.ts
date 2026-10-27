import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment variables."
    );
  }
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
}

function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) globalForPrisma.prisma = createClient();
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrisma();
    const value = client[prop as keyof PrismaClient] as unknown;
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value;
  },
});

const RETRYABLE_CODES = new Set(["P1001", "P1017", "P2024", "P2028"]);
const RETRYABLE_MESSAGE =
  /ECONNREFUSED|ECONNRESET|ETIMEDOUT|EPIPE|socket hang up|Connection terminated|endpoint has been closed|Can't reach database server/i;

export async function withDbRetry<T>(
  fn: () => Promise<T>,
  attempts = 3
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const e = error as { code?: string; message?: string };
      const retryable =
        (e.code && RETRYABLE_CODES.has(e.code)) ||
        RETRYABLE_MESSAGE.test(e.message ?? "") ||
        RETRYABLE_MESSAGE.test(String((e as { cause?: unknown }).cause ?? ""));
      if (!retryable || i === attempts - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** i));
    }
  }
  throw lastError;
}
