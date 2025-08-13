import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

import { HeroVista } from "@/components/mersifvista/hero-vista"
import { VistaFeatures} from "@/components/mersifvista/highlight-feature"
import { VistaDemo} from "@/components/mersifvista/product-vista"
import { VistaUseCases } from "@/components/mersifvista/use-cases-vista"
import { VistaTestimonials } from "@/components/mersifvista/testimonila-vista"
import { VistaCTA } from "@/components/mersifvista/contact-cta-vista"

export default function MersifVistaPage() {
  return (
    <>
      <Header />
      <main>
        <HeroVista />
        <VistaFeatures />
        <VistaDemo />
        <VistaUseCases />
        <VistaTestimonials />
        <VistaCTA />
      </main>
      <Footer />
    </>
  )
}
