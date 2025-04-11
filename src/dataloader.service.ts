import { Injectable, Scope } from "@nestjs/common";
import DataLoader from "dataloader";
import { PrismaClient } from "@prisma/client";
import { PrismaModels } from "./types";

/**
 * DataloaderService
 * Generates request-scoped DataLoaders for Prisma models to optimize repeated DB calls.
 */
@Injectable({ scope: Scope.REQUEST })
export class DataLoaderService {
  private loaders = new Map<string, DataLoader<any, any>>();

  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Returns a DataLoader instance for a specific Prisma model and field.
   *
   * @param model - Prisma model name
   * @param field - Field to batch load on (default is "id")
   * @param options - Optional DataLoader config (e.g., caching)
   * @returns A DataLoader instance for batching and caching DB calls
   */
  getLoader<T = any>(
    model: PrismaModels,
    field: keyof T = "id" as keyof T,
    options = { cache: false }
  ): DataLoader<any, T | null> {
    const key = JSON.stringify({ model, field });

    if (!this.loaders.has(key)) {
      this.loaders.set(
        key,
        new DataLoader<any, T | null>(async (ids: readonly any[]) => {
          const records = await this.prisma[model].findMany({
            where: {
              [field]: { in: ids },
            },
          });

          const map = new Map<any, T>(
            records.map((item: any) => [item[field], item])
          );

          return ids.map((id) => map.get(id) || null);
        }, options)
      );
    }

    return this.loaders.get(key)!;
  }
}
