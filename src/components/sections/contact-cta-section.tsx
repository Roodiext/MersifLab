import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactCtaSection() {
  return (
    <section className="w-full py-20 md:py-28 lg:py-36 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-pink-300 to-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-40 right-1/4 w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-300 opacity-60"></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-500 opacity-60"></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-purple-400 rounded-full animate-bounce delay-700 opacity-60"></div>
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column: Image with smooth floating effect */}
          <div className="lg:order-1 flex justify-center relative">
            <div className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl">
                {/* Wrapper div for animation */}
                <img
                  src="/img/te1.png"
                  width={500}
                  height={500}
                  alt="Person in VR headset interacting with digital elements"
                  className="max-w-full h-auto rounded-2xl animate-float"
                />
              </div>
            </div>
          </div>
          {/* Right Column: Enhanced Contact Form with modern styling */}
          <div className="lg:order-2 flex flex-col items-start gap-10">
            {/* Header with enhanced styling and animations */}
            <div className="text-left space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                Get in Touch
              </div>
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Contact Us
              </h2>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Have questions or need support? We're here to help you succeed. Send us a message and we'll get back to
                you quickly.
              </p>
            </div>
            {/* Enhanced form with glassmorphism and advanced interactions */}
            <div className="w-full space-y-8 bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:bg-white/90">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-lg group-hover:border-blue-200"
                  />
                </div>
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-lg group-hover:border-blue-200"
                  />
                </div>
              </div>
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Input
                  type="text"
                  placeholder="What's this about?"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-lg group-hover:border-blue-200"
                />
              </div>
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-6 py-4 rounded-2xl border-2 border-blue-100 min-h-[160px] focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-lg group-hover:border-blue-200 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center gap-3">
                  Send Message
                  <svg
                    className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </span>
              </Button>
            </div>
            {/* Enhanced contact info with better design */}
            <div className="flex flex-wrap gap-8 pt-6">
              <div className="flex items-center gap-4 text-gray-600 group hover:text-blue-600 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-lg">Quick Response</span>
                  <p className="text-sm text-gray-500">Within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600 group hover:text-green-600 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-lg">24/7 Support</span>
                  <p className="text-sm text-gray-500">Always available</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600 group hover:text-purple-600 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-lg">Expert Team</span>
                  <p className="text-sm text-gray-500">Professional support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
