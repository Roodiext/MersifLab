"use client"

import { useLanguage } from "@/contexts/language-context"

export default function JoinVista() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="w-full bg-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug"
          >
            {t("vista.form.title")} <span className="text-[#007BFF] font-bold">{t("vista.form.title.highlight")}</span>?
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif" }} className="mt-4 text-gray-600">
            {t("vista.form.subtitle")}
          </p>
        </div>

        {/* Right Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border">
          <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="text-xl font-semibold text-gray-900 mb-6">
            {t("vista.form.form.title")}
          </h3>
          <form className="space-y-5">
            {/* Name */}
            <div>
              <label
                style={{ fontFamily: "Inter, sans-serif" }}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("vista.form.name")}
              </label>
              <input
                style={{ fontFamily: "Inter, sans-serif" }}
                type="text"
                placeholder={t("vista.form.name.placeholder")}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{ fontFamily: "Inter, sans-serif" }}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("vista.form.email")}
              </label>
              <input
                style={{ fontFamily: "Inter, sans-serif" }}
                type="email"
                placeholder={t("vista.form.email.placeholder")}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Question */}
            <div>
              <label
                style={{ fontFamily: "Inter, sans-serif" }}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("vista.form.question")}
              </label>
              <textarea
                style={{ fontFamily: "Inter, sans-serif" }}
                placeholder={t("vista.form.question.placeholder")}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              style={{ fontFamily: "Inter, sans-serif" }}
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {t("vista.form.submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
