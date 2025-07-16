'use client'

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Maximize } from "lucide-react"

export function AboutUsSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [areControlsVisible, setAreControlsVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        if (!isVisible) {
          videoRef.current.pause()
        } else {
          videoRef.current.play()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting fullscreen: ${err.message}`)
        })
      }
    }
  }

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6 lg:pl-12">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#007bff]">About us</h2>
            <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Kami menyediakan ruang virtual
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                MersifLab adalah startup teknologi pendidikan yang berdedikasi untuk memperkaya pengalaman belajar di
                Indonesia. Kami percaya bahwa teknologi dapat membuka potensi tak terbatas dalam pendidikan, dan kami
                berkomitmen untuk mengembangkan perangkat pembelajaran inovatif berbasis Augmented Reality (AR), Virtual
                Reality (VR), dan Internet of Things (IoT).
              </p>
              <p className="text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Misi kami adalah menciptakan lingkungan belajar yang imersif, interaktif, dan relevan dengan kebutuhan
                abad ke-21, mempersiapkan siswa dan guru untuk masa depan yang lebih cerah.
              </p>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto">
            <div
              className="relative aspect-video w-full max-w-[600px] overflow-hidden rounded-xl bg-gray-200"
              onMouseEnter={() => setAreControlsVisible(true)}
              onMouseLeave={() => setAreControlsVisible(false)}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="/vid/SiswanMahasiswa.mp4"
                autoPlay
                muted={isMuted}
                loop
                preload="metadata"
              >
                Browser Anda tidak mendukung tag video.
              </video>
              {areControlsVisible && (
                <div className="absolute bottom-4 right-4 flex gap-2 p-2 bg-black bg-opacity-50 rounded-lg transition-opacity duration-300">
                  <button
                    onClick={toggleMute}
                    className="text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize className="h-6 w-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
