# nestjs-prisma-dataloader

**Effortless request-scoped Prisma DataLoaders for NestJS.**  
Avoid N+1 problems and optimize your database queries with ease.

---

## 📦 Installation

```bash
npm install nestjs-prisma-dataloader
```

---

## ⚙️ What is this?

This package integrates [DataLoader](https://github.com/graphql/dataloader) with Prisma and NestJS, making it **easy to batch and cache** Prisma queries **per request**. It’s ideal for GraphQL and REST APIs where you want to avoid repeated database calls for the same data.

---

## ✨ Features

- **🔁 Request-scoped caching** for DataLoader
- **📦 Plug and play module** for NestJS
- **📚 Supports batching and caching** for Prisma queries
- **💡 Auto-cleared on each request** – no stale data
- **📐 Typescript-ready** with clear typings

---

## 🚀 How to use in NestJS (Step-by-Step)

### 1. **Import the Module**

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { DataloaderModule } from 'nestjs-prisma-dataloader';

@Module({
  imports: [DataloaderModule],
})
export class AppModule {}
```

---

### 2. **Inject and use the DataloaderService**

```ts
// user.service.ts
import { Injectable } from '@nestjs/common';
import { DataloaderService } from 'nestjs-prisma-dataloader';

@Injectable()
export class UserService {
  constructor(private readonly dataloader: DataloaderService) {}

  async getUsers(userIds: number[]) {
    const userLoader = this.dataloader.getLoader('user');
    return await userLoader.loadMany(userIds);
  }
}
```

📌 **Note:** `'user'` here should match the key you’ve configured in the DataloaderService (default or customized).

---

## ✅ When to Use

- In GraphQL resolvers to prevent N+1 queries
- In REST endpoints where the same record is queried multiple times
- When you want per-request caching in a Prisma + NestJS project

---

## ❌ When Not to Use

- If you're not using Prisma
- In background workers or CLI scripts (non-request context)
- When your ORM queries are already optimized using relations or joins

---

## ⚠️ Things to Keep in Mind

- Make sure DataloaderService is **request-scoped**
- Always match loader keys exactly
- This package does not auto-generate loaders — you define them

---

## 🧾 License

MIT

---

## 🔗 Links

- **NPM:** [nestjs-prisma-dataloader](https://www.npmjs.com/package/nestjs-prisma-dataloader)
- **GitHub:** [github.com/sahiljaggarwal/nestjs-prisma-dataloader](https://github.com/sahiljaggarwal/nestjs-prisma-dataloader)

---

**Made with ❤️ for NestJS + Prisma developers**