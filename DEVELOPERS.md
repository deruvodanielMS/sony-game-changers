# Next.js Best Practices Guide

This guide provides recommended best practices for modern **Next.js App Router** projects, with a focus on **i18n**, image handling, API/server actions, and data fetching.

---

## 1️⃣ Project Structure

Maintain a clear and scalable project structure:

````text
app/
├─ [locale]/             # Dynamic locale folder
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ about/page.tsx
│  └─api/                # Server actions and backend
components/              # Reusable components
messages/                # Translation JSON files
common/                  # Shared constants, routes ...
utils/                   # Helpers
hooks/                   # Custom hooks

## 2️⃣ i18n & Navigation

Always use i18n utilities to guarantee correct translations throughout the application:

```text
import { Link, redirect, usePathname, useRouter } from '@/i18n/navigation';
````

### redirect: Server-side redirection with locale support:

```text
redirect('/es');
```

### useRouter & usePathname: Client-side navigation and path detection:

```text
const router = useRouter();
const pathname = usePathname();
router.push('/contact');
```

## 3️⃣ Images

Always use next/image for optimized loading:

```text
import Image from 'next/image';
<Image
  src="/images/logo.png"
  alt="Logo"
  width={150}
  height={50}
  priority
/>
```

- Provide alt, width, and height.
- Use priority for critical images.
- Configure external domains in next.config.js if needed.

## 4️⃣ Server Actions & Forms

Centralize mutation logic in server actions inside api/.../:

```text
// api/contact/submit.ts
export async function submitContactForm(data: ContactForm) {
  // Validation and persistence logic
  return { success: true };
}
```

Invoke server actions directly from forms:

```text
'use client';
import { submitContactForm } from '@/api/contact/submit';

<form action={submitContactForm}>
  <input name="name" />
  <button type="submit">Send</button>
</form>

```

- Keep business logic on the server.
- Client components should only handle UI.

## 5️⃣ Fetching & Loaders in Server Components

Fetch data directly in Server Components:

```text
// app/[locale]/page.tsx
async function getPosts() {
  const res = await fetch(`${process.env.API_URL}/posts`, { cache: 'no-store' });
  return res.json();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

- Avoid unnecessary fetch in client components.
- Use cache: 'no-store' for always-fresh data, or cache: 'force-cache' for rarely-changing data.

## 6️⃣ Flow Diagram: Locale Routing + Server Actions

```text
          ┌───────────────┐
          │   / (root)    │
          └───────┬───────┘
                  │ redirect
                  ▼
        ┌───────────────────┐
        │   /[locale]/      │
        │   (Server Layout) │
        └───────┬───────────┘
          │       │
          ▼       ▼
     /about/page  /contact/page
       │             │
       ▼             ▼
Server Components   Forms
   fetch()         formAction → Server Action

```

- Root / redirects to default locale (/en or /es).
- [locale]/ contains all pages per language.
- Server Components fetch data directly from API.
- Forms use formAction to invoke server actions.

## 7️⃣ Additional Best Practices

- Reusable layouts for headers, footers, and navs.
- Separate presentation and data logic.
- Use TypeScript for type safety.
- Avoid hardcoded strings; always use translation keys.
- Centralize i18n routing to ensure maintainability.
