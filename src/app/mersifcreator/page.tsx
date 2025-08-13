import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSectionCreator } from "@/components/mersifcreator/hero-creator"

export default function HomePageCreator() {
  return (
    <>
      <Header />
      <HeroSectionCreator />
      <Footer />
    </>
  )
}
