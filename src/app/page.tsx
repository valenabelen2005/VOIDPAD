import { Hero } from '@/components/home/Hero'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { Reviews } from '@/components/home/Reviews'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <Reviews />
    </>
  )
}
