"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, ShoppingCart, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const products = [
  {
    id: 1,
    name: "Agnivolt",
    image: "/img/agnivolt.jpg",
    specs: "Sensor daya listrik untuk pompa air",
    specsEn: "Power sensor for water pumps",
    description:
      "Sistem monitoring pintar untuk menghitung konsumsi daya listrik pada pompa air. Membantu mengoptimalkan penggunaan energi dan biaya operasional pompa air rumah tangga atau industri.",
    descriptionEn:
      "Smart monitoring system to calculate power consumption of water pumps. Helps optimize energy usage and operational costs for household or industrial water pumps.",
    manualFile: "/manuals/agnivolt.pdf",
  },
  {
    id: 2,
    name: "Mosyen AI",
    image: "/img/mosyenai.jpg",
    specs: "AI-powered 3D design software",
    specsEn: "AI-powered 3D design software",
    description:
      "Software desain 3D berbasis AI yang memudahkan pembuatan model dan desain tiga dimensi. Menggunakan teknologi artificial intelligence untuk mempercepat proses desain dan rendering.",
    descriptionEn:
      "AI-based 3D design software that facilitates the creation of three-dimensional models and designs. Uses artificial intelligence technology to accelerate design and rendering processes.",
    manualFile: "/manuals/mosyen-ai.pdf",
  },
]

export function ProductIoT() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { t, language } = useLanguage()

  return (
    <section id="product" className="w-full py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            {t("iot.products.title")}
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif" }} className="text-slate-600 max-w-2xl mx-auto">
            {t("iot.products.subtitle")}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="group w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-200 hover:border-blue-200"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors"
                >
                  {product.name}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif" }} className="text-sm text-slate-500 leading-relaxed">
                  {language === "en" ? product.specsEn : product.specs}
                </p>
                <div style={{ fontFamily: "Inter, sans-serif" }} className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 group-hover:translate-x-1 transition-all"
                  >
                    {t("iot.products.view.detail")} →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
          {selectedProduct && (
            <>
              <div className="relative">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <Button
                  onClick={() => setSelectedProduct(null)}
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>

                <DialogHeader className="absolute bottom-4 left-6 right-6">
                  <DialogTitle className="text-2xl font-bold text-white mb-1">{selectedProduct.name}</DialogTitle>
                  <p className="text-white/80 text-sm">
                    {language === "en" ? selectedProduct.specsEn : selectedProduct.specs}
                  </p>
                </DialogHeader>
              </div>

              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">{t("iot.products.modal.description")}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {language === "en" ? selectedProduct.descriptionEn : selectedProduct.description}
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all bg-transparent"
                >
                  <a href={selectedProduct.manualFile} download>
                    <Download className="mr-2 h-4 w-4" /> {t("iot.products.modal.download.manual")}
                  </a>
                </Button>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">{t("iot.products.modal.order.form")}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t("iot.products.modal.full.name")}
                      </label>
                      <input
                        type="text"
                        placeholder={t("iot.products.modal.full.name.placeholder")}
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t("iot.products.modal.email")}
                      </label>
                      <input
                        type="email"
                        placeholder={t("iot.products.modal.email.placeholder")}
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t("iot.products.modal.quantity")}
                      </label>
                      <input
                        type="number"
                        placeholder={t("iot.products.modal.quantity.placeholder")}
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        min="1"
                        defaultValue="1"
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all shadow-lg hover:shadow-xl">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {t("iot.products.modal.order.now")}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
