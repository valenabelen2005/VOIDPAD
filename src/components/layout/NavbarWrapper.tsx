import { getCollections } from '@/lib/shopify'
import { Navbar } from './Navbar'

export async function NavbarWrapper() {
  const collections = await getCollections(12)
  const slim = collections.map((c) => ({ handle: c.handle, title: c.title }))
  return <Navbar collections={slim} />
}
