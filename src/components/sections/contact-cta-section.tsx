import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function ContactCtaSection() {
  const { t } = useLanguage()
  
  return (
    <section id="contact" className="w-full py-20 md:py-28 lg:py-36 relative overflow-hidden bg-gray-50">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(5px); }
          66% { transform: translateY(-10px) translateX(-5px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }

        /* Wave styles - Adjusted for brighter waves */
        .wave {
          /* Base color #1a365d is rgb(26, 54, 93) */
          background: rgba(26, 54, 93, 0.8); /* Most prominent wave is brighter */
          border-radius: 1000% 1000% 0 0;
          position: absolute;
          width: 200%;
          height: 12em;
          animation: wave 10s -3s linear infinite;
          transform: translate3d(0, 0, 0);
          bottom: 0;
          left: 0;
          z-index: 0; /* Ensure waves are behind content */
        }
        .wave:nth-of-type(2) {
          background: rgba(26, 54, 93, 0.6); /* Slightly less bright */
          bottom: -1.25em;
          animation: wave 18s linear reverse infinite;
        }
        .wave:nth-of-type(3) {
          background: rgba(26, 54, 93, 0.4); /* Darkest wave */
          bottom: -2.5em;
          animation: wave 20s -1s reverse infinite;
        }
        @keyframes wave {
          0% { transform: translateX(0); }
          25% { transform: translateX(-25%); }
          50% { transform: translateX(-50%); }
          75% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
      ` }} />
      {/* Wave elements - positioned at the bottom */}
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />

      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:order-1 space-y-6">
            <div className="space-y-4">
              <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {t('contact.title')}
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif" }} className="text-lg text-gray-600 leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </div>
          </div>
          {/* Right Column - Contact Form */}
          <div className="lg:order-2 flex justify-center">
            <div className="w-full max-w-md">
              <div style={{ fontFamily: "Poppins, sans-serif" }} className="space-y-6 bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-900">
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
                  {t('contact.title')}
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">{t('contact.form.name')} :</label>
                  <Input
                    type="text"
                    placeholder={t('contact.form.name')}
                    className="px-4 py-3 rounded-lg font-inter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">{t('contact.form.email')} :</label>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    className="px-4 py-3 rounded-lg font-inter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">{t('contact.form.message')} :</label>
                  <Textarea
                    placeholder={t('contact.form.message')}
                    className="px-4 py-3 rounded-lg min-h-[120px] font-inter resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gray-900 text-white font-semibold text-base hover:bg-gray-800 transition-all"
                >
                  {t('contact.form.submit')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
