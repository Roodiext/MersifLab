import { HeroSectionDummy } from "@/components/mersifiot/hero-iot"
import { ProductIoT } from "@/components/mersifiot/product-iot"
import { CustomIoTRequest } from "@/components/mersifiot/custom-iot-request"
import { TestimonialFAQ } from "@/components/mersifiot/testimonial-iot"
import { ContactForm } from "@/components/mersifiot/contact-cta"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePageIoT() {
  return (
    <>
      <Header />
      <HeroSectionDummy />
      <ProductIoT />
      <CustomIoTRequest />
      <TestimonialFAQ />
      <ContactForm />
      <Footer />
    </>
  )
}
