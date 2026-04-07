Here are **all important Prisma commands** (CLI) organized clearly so you can use them in real projects 👇

---

# 🚀 Prisma Core Commands
## ⬇ Install 

```bash
npm install prisma@6
```

## 🔧 Setup & Init

```bash
npx prisma init
```

* Creates `prisma/schema.prisma` and `.env`

---

## 🧩 Generate Prisma Client

```bash
npx prisma generate
```

* Generates Prisma Client after schema changes

---

## 🔍 Database Introspection

```bash
npx prisma db pull
```

* Pulls existing DB → Prisma schema

```bash
npx prisma db push
```

* Push schema → DB (no migration)

---

## 📦 Migrations (Production Safe)

```bash
npx prisma migrate dev --name init
```

* Create + apply migration (dev)

```bash
npx prisma migrate deploy
```

* Apply migrations in production

```bash
npx prisma migrate reset
```

* Reset DB (⚠️ deletes all data)

```bash
npx prisma migrate status
```

* Check migration status

---

## 🧪 Prisma Studio (GUI)

```bash
npx prisma studio
```

* Opens database UI in browser

---

## 🧹 Format Schema

```bash
npx prisma format
```

---

## 🔎 Validate Schema

```bash
npx prisma validate
```

---

## 📄 View SQL Queries

```bash
npx prisma db execute --file ./script.sql
```

---

## ⚡ Seed Database

```bash
npx prisma db seed
```

---

## 🔐 Fix Common Issues

### ❌ TLS / SSL Error Fix (like your error)

👉 Add in `.env`

```env
DATABASE_URL="mysql://user:password@localhost:3306/dbname?sslaccept=strict"
```

OR disable SSL (dev only):

```env
DATABASE_URL="mysql://user:password@localhost:3306/dbname?sslaccept=accept_invalid_certs"
```

---

## 🔄 New Prisma (IMPORTANT CHANGE ⚠️)

You saw this error:

> `url is no longer supported in schema.prisma`

👉 Now you must use:

### `prisma.config.ts`

```ts
import { defineConfig } from "prisma";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
```

---

# 📌 Full Dev Flow (Best Practice)

```bash
npx prisma init
npx prisma db pull   # if existing DB
npx prisma generate

# OR new DB
npx prisma migrate dev --name init
npx prisma generate

npx prisma studio
```

---

# 💡 Pro Tips (Important for you)

Since you're using:

* Node.js + TypeScript
* mysql2
* MVC

👉 Use Prisma only if:

* You want ORM abstraction
* OR reduce raw SQL

Otherwise mysql2 is already powerful 👍

---

# ✍️ Your Writing Improvement Prompt

Try this next time to get even better output:

> "Give me Prisma CLI commands with real-world usage examples and common error fixes (especially TLS and config changes), structured for Node.js + MySQL projects."

---

If you want, I can also give:

* ✅ Prisma + Express full setup
* ✅ Replace mysql2 with Prisma step-by-step
* ✅ Fix your current TLS error properly

Just tell me 👍
