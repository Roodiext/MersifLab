import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSectionCreator } from "@/components/mersifcreator/hero-creator"
import { TheRoomsSection } from "@/components/mersifcreator/the-room-creator"

export default function HomePageCreator() {
  return (
    <>
      <Header />
      <HeroSectionCreator />
      <TheRoomsSection />
      <Footer />
    </>
  )
}
