import { Hero } from '@/components/home/Hero'
import { WhyVoidPad } from '@/components/home/WhyVoidPad'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { Reviews } from '@/components/home/Reviews'
import { getApprovedReviews } from '@/app/actions/reviews'

export default async function HomePage() {
  const reviews = await getApprovedReviews()

  return (
    <>
      <Hero />
      <CategoryGrid />
      <WhyVoidPad />
      <Reviews reviews={reviews} />
    </>
  )
}
