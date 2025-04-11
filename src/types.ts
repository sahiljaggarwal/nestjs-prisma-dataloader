import { PrismaClient } from "@prisma/client";

/**
 * Type representing all Prisma model names (excluding system methods).
 */
export type PrismaModels = keyof Omit<
  PrismaClient,
  | "$connect"
  | "$disconnect"
  | "$on"
  | "$transaction"
  | "$use"
  | "$executeRaw"
  | "$queryRaw"
  | "$executeRawUnsafe"
  | "$queryRawUnsafe"
>;
