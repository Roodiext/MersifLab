import { HeaderVista } from "@/components/layout/header-vista";

import { HeroVista } from "@/components/mersifvista/hero-vista";
import{ AboutVista }from "@/components/mersifvista/about-vista";
import PilarVista from "@/components/mersifvista/pilar-vista";
import OurTeamVista from "@/components/mersifvista/ourteam-vista";
import ImpactVista from "@/components/mersifvista/impact-vista";
import FormVista from "@/components/mersifvista/form-vista";
import { Footer } from "@/components/layout/footer" // ✅ default import

export default function MersifVistaPage() {    
  return ( 
    <>
      <main> 
        <HeaderVista />
        <HeroVista />
        <AboutVista />
        <PilarVista />
        <OurTeamVista />
        <ImpactVista />
        <FormVista />
        <Footer />
      </main>
    </>
  );
}
