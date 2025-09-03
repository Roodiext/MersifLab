import HomePageAcademy from "@/components/mersifacademy/hero-academy";
import PartnerAcademy from "@/components/mersifacademy/partner-academy";
import ServiceAcademy from "@/components/mersifacademy/service-academy";
import PrestasiAcademy from "@/components/mersifacademy/prestasi-academy";
import MentorAcademy from "@/components/mersifacademy/mentor-academy";
import PaketAcademy from "@/components/mersifacademy/paket-academy";
import { HeaderAcademy } from "@/components/layout/header-academy";
import { Footer } from "@/components/layout/footer"


export default function HomeAcademy() {

  return (
    <>
      <HeaderAcademy />
      <HomePageAcademy />
      <PartnerAcademy />
      <ServiceAcademy />
      <PrestasiAcademy />
      <MentorAcademy />
      <PaketAcademy />
      <Footer />
    </>
  );
}
