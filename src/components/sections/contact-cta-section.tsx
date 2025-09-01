"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function ContactCtaSection() {
  const { t } = useLanguage()
  
  return (
    <section id="contact" className="w-full py-20 md:py-28 lg:py-36 ">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        {/* Title and Subtitle - Centered above everything */}
        <div className="text-center mb-16">
          <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {t('contact.title')}
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif" }} className="text-lg text-gray-600 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className="lg:order-1 flex justify-center lg:justify-start">
            <div className="image-container relative w-[400px] h-[350px] sm:w-[450px] sm:h-[400px] md:w-[550px] md:h-[480px] lg:w-[600px] lg:h-[520px]">
              <img
                src="/img/contact-person.svg"
                alt="Person wearing VR headset"
                className="w-full h-full object-contain transform -translate-y-20 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/90 to-transparent rounded-b-xl pointer-events-none z-10" />
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