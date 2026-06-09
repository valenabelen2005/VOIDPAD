import { Hero } from '@/components/home/Hero'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { CategoryGrid } from '@/components/home/CategoryGrid'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryGrid />
    </>
  )
}
