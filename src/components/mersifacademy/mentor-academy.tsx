"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

function MentorCard({ mentor }) {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div
      className="mentor-card bg-white rounded-lg p-6 shadow-lg border hover:border-blue-300 relative cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={mentor.image || "/placeholder.svg"}
          alt={mentor.name}
          className="mentor-photo mb-4 w-32 h-32 object-cover rounded-full"
        />
        <h3 className="text-xl font-bold text-blue-900 mb-2">{mentor.name}</h3>
        <p className="text-blue-600 font-medium mb-3">{mentor.field}</p>
        <div className="flex items-center justify-center text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{mentor.achievement}</span>
        </div>
        <p className="text-gray-600 text-sm">{mentor.desc}</p>
      </div>

      {/* Experience Bubble */}
      {open && (
        <div className="absolute inset-0 bg-white rounded-lg shadow-2xl p-6 flex flex-col z-20">
          <button
            className="self-end text-2xl text-gray-500 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
          >
            &times;
          </button>
          <div className="mb-4">
            <h4 className="font-bold text-blue-900 mb-3">{t("academy.mentors.experience")}</h4>
            <ul className="space-y-2 text-sm text-gray-600 text-left">
              {mentor.experience.map((exp, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {exp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default function MentorAcademy() {
  const { t, mentorsData } = useLanguage()

  const mentorsWithImages = mentorsData.map((mentor, index) => ({
    ...mentor,
    image: `/mersif-academy/logo/${index === 0 ? "mentor1.jpg" : `${index + 1} (1).jpg`}`,
  }))

  return (
    <section id="mentor" className="hero-gradient relative overflow-x-hidden py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">{t("academy.mentors.title")}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("academy.mentors.subtitle")}</p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentorsWithImages.map((m, i) => (
            <MentorCard key={i} mentor={m} />
          ))}
        </div>
      </div>
    </section>
  )
}
