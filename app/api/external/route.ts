import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const query = url.searchParams.get('q')

  const res = await fetch(`https://api.com/search?q=${query}`, {
    headers: {
      'X-API-Key': process.env.EXTERNAL_API_KEY!,
    },
  })

  const data = await res.json()
  return NextResponse.json(data)
}
