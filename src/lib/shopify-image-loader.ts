export default function shopifyImageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const url = new URL(src)
  url.searchParams.set('width', String(width))
  url.searchParams.set('quality', String(quality ?? 75))
  return url.toString()
}
