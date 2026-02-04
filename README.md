This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **UI Library:** [React 19](https://react.dev)
- **Language:** [TypeScript 5](https://www.typescriptlang.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) + CSS Variables
- **Animations:** [Framer Motion 12](https://www.framer.com/motion) (LazyMotion optimized)
- **UI Primitives:** [Radix UI](https://www.radix-ui.com)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs)
- **Testing:** [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react)
- **Storybook:** [Storybook 8](https://storybook.js.org)
- **Database (local):** [Prisma](https://www.prisma.io) + SQLite

## Getting Started

First, install dependencies, and then run the development server:

```bash
yarn install --frozen-lockfile
```

🚀 One-step Setup (Optional)

For convenience, the following scripts are available:

```bash
yarn dev:setup
```

(More Info on Local Development – Prisma Onboarding)

```bash
yarn dev
```

### Dockerfile

```bash
docker compose build --no-cache
docker compose up
```

#### Down the image

```bash
docker compose down -v
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🧩 Local Development – Prisma Onboarding

This project uses **Prisma + SQLite** for local development in order to keep the setup simple and accessible for all team members.

The backend logic is mocked locally using Prisma and Next.js API routes.  
The real backend will be provided by an external team.

### Generate Prisma Client

Generates the Prisma Client based on the current schema.

```bash
npx prisma generate
```

### Run database migrations

Creates the local SQLite database and applies all migrations.

```bash
npx prisma migrate dev
```

### Seed the database

Populates the database with base and demo data.

```bash
npx prisma db seed
```

### One-step Setup (Optional)

For convenience, the following scripts are available:

```bash
yarn dev:setup
```

#### This runs:

- dependency installation
- Prisma client generation
- migrations
- database seed

### To fully reset the database:

```bash
yarn db:reset
```

⚠️ This will delete all local data and re-apply migrations.

---

## 📦 Requirements

- Node.js `>= 18`
- Yarn
- Git

No external database is required for local development.

---

## 🔐 Environment Variables

Create a local environment file:

```bash
cp .env.example .env
```

## Storybook

Run Storybook for isolated component development:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the component library.

Build Storybook for production:

```bash
npm run build-storybook
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sony Gamechangers Docs

- [DEVELOPERS.md](./DEVELOPERS.md) You will find a set of good practices and information related to this project.

- [CODE_GUIDELINES.md](./CODE_GUIDELINES.md) Defines coding conventions, naming rules, and pull request requirements to maintain a consistent code style.

- [A11Y.md](./A11Y.md) Contains accessibility (a11y) best practices and recommendations for developing inclusive user interfaces.
