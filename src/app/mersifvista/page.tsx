import { HeaderVista } from "@/components/layout/header-vista"
import { Footer } from "@/components/layout/footer"

import { HeroVista } from "@/components/mersifvista/hero-vista"
import AboutVista from "@/components/mersifvista/about-vista"
import PilarVista from "@/components/mersifvista/pilar-vista"
import ProgramVista from "@/components/mersifvista/program-vista"
import ImpactVista from "@/components/mersifvista/impact-vista"

export default function MersifVistaPage() {
  return (
    <>
      <main>
        <HeaderVista />
        <HeroVista />
        <AboutVista />
        <PilarVista />
        <ProgramVista />
        <ImpactVista />
      </main>
    </>
  )
}
