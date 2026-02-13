// Very small reversible 'encryption' for demo purposes only.
// Not secure — uses XOR with a key and base64 encoding.
export function encrypt(plain: string, key: string): string {
  const text = Buffer.from(plain, 'utf8')
  const k = Buffer.from(key, 'utf8')
  const out = Buffer.alloc(text.length)
  for (let i = 0; i < text.length; i++) out[i] = text[i] ^ k[i % k.length]
  return out.toString('base64')
}

export function decrypt(enc: string, key: string): string {
  const buf = Buffer.from(enc, 'base64')
  const k = Buffer.from(key, 'utf8')
  const out = Buffer.alloc(buf.length)
  for (let i = 0; i < buf.length; i++) out[i] = buf[i] ^ k[i % k.length]
  return out.toString('utf8')
}
