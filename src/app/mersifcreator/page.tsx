import { HeaderCreator } from "@/components/layout/header-creator"
import { FooterCreator } from "@/components/layout/footer-creator"
import { HeroSectionCreator } from "@/components/mersifcreator/hero-creator"
import { TheRoomsSection } from "@/components/mersifcreator/the-room-creator"
import { AboutSection } from "@/components/mersifcreator/about-section"
import { FeaturesSection } from "@/components/mersifcreator/features-section"
import { TestimonialsSection } from "@/components/mersifcreator/testimonials-section"

export default function HomePageCreator() {
  return (
    <>
      <HeaderCreator />
      <HeroSectionCreator />
      <AboutSection />
      <FeaturesSection />
      <TheRoomsSection />
      <TestimonialsSection />
      <FooterCreator/>
    </>
  )
}
