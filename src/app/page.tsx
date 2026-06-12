import { Hero } from '@/components/home/Hero'
import { WhyVoidPad } from '@/components/home/WhyVoidPad'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { Reviews } from '@/components/home/Reviews'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyVoidPad />
      <CategoryGrid />
      <Reviews />
    </>
  )
}
