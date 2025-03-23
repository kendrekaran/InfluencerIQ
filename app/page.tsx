import { Features } from "@/components/ui/features"
import { HeroSection } from "@/components/blocks/hero-section-dark"
import { RecentPosts } from "@/components/blocks/recent-posts"
import Filter from "@/components/blocks/filter"
import { Footer } from "@/components/ui/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <RecentPosts />
      <Filter />
      <Features />
      <Footer/>
    </main>
  )
}
