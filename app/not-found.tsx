'use client'

import Error404 from '@/components/ui/molecules/Error/Error404'

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  return <Error404 />
}
