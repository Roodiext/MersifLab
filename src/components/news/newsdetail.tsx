"use client"

import { useState } from "react"
import { Share2, Bookmark, MessageCircle, Clock, Eye, ArrowLeft, ChevronRight, Send, Heart } from "lucide-react"

export function NewsDetail() {
  return <NewsDetailPage />
}

const NewsDetailPage = () => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Ahmad Taufik",
      avatar: "AT",
      avatarBg: "bg-slate-700",
      time: "2 jam yang lalu",
      content: "Artikel yang sangat informatif! Transformasi digital memang sudah menjadi kebutuhan, bukan lagi pilihan. Terima kasih atas insights yang berharga.",
      likes: 12,
      liked: false
    },
    {
      id: 2,
      author: "Maria Sari",
      avatar: "MS",
      avatarBg: "bg-emerald-600",
      time: "4 jam yang lalu",
      content: "Sebagai pelaku UMKM, saya sangat terbantu dengan informasi ini. Harapan saya pemerintah terus mendukung transformasi digital untuk usaha kecil.",
      likes: 8,
      liked: true
    }
  ])

  const newsData = {
    id: 1,
    title: "Revolusi Digital Indonesia 2024: Transformasi Teknologi yang Mengubah Lanskap Bisnis",
    subtitle:
      "Pelajari bagaimana perusahaan-perusahaan lokal beradaptasi dengan era digital baru dan memanfaatkan inovasi teknologi untuk pertumbuhan bisnis yang berkelanjutan",
    author: "Mersif Lab",
    publishedDate: "15 Juli 2024",
    readTime: "8 menit baca",
    views: "12,847",
    category: "Teknologi",
    image: "/api/placeholder/1200/600",
    content: [
      "Era digital telah membawa perubahan fundamental dalam cara berbisnis di Indonesia. Transformasi digital bukan lagi pilihan, melainkan kebutuhan mendesak bagi perusahaan yang ingin bertahan dan berkembang di pasar yang semakin kompetitif.",

      "Menurut survei terbaru dari Indonesia Digital Association, lebih dari 78% perusahaan Indonesia telah mengadopsi teknologi digital dalam operasional mereka. Angka ini menunjukkan peningkatan drastis dibanding tahun sebelumnya yang hanya mencapai 45%.",

      "Direktur Eksekutif Mersif Lab, Dr. Ahmad Susanto, menekankan pentingnya strategi yang tepat: 'Transformasi digital bukanlah sekadar menggunakan teknologi baru, tetapi mengubah mindset dan budaya perusahaan secara menyeluruh.'",

      "Sektor-sektor yang mengalami transformasi paling signifikan meliputi e-commerce, fintech, pendidikan online, dan layanan kesehatan digital. Pertumbuhan sektor-sektor ini mencapai rata-rata 35% per tahun, jauh melampaui sektor tradisional.",

      "Tantangan utama yang dihadapi perusahaan Indonesia dalam proses digitalisasi adalah kurangnya talenta digital yang berkualitas. Untuk mengatasi hal ini, berbagai program pelatihan dan sertifikasi digital telah diluncurkan oleh pemerintah dan sektor swasta.",

      "Investasi dalam infrastruktur digital juga menjadi kunci sukses transformasi. Pemerintah Indonesia telah mengalokasikan anggaran sebesar Rp 15 triliun untuk pengembangan infrastruktur digital nasional dalam tiga tahun ke depan.",

      "Dampak positif transformasi digital tidak hanya dirasakan oleh perusahaan besar, tetapi juga UMKM. Platform digital telah membuka peluang baru bagi usaha kecil dan menengah untuk menjangkau pasar yang lebih luas.",

      "Ke depan, Indonesia diprediksi akan menjadi salah satu kekuatan ekonomi digital terbesar di Asia Tenggara. Dengan populasi yang besar dan tingkat penetrasi internet yang terus meningkat, potensi pertumbuhan ekonomi digital Indonesia sangat menjanjikan.",
    ],
    relatedNews: [
      { id: 2, title: "Inovasi Terbaru dalam Dunia Tech", category: "Teknologi", time: "2 jam yang lalu" },
      { id: 3, title: "Strategi Bisnis Digital 2024", category: "Bisnis", time: "4 jam yang lalu" },
      { id: 4, title: "Masa Depan Artificial Intelligence", category: "AI & ML", time: "1 hari yang lalu" },
    ],
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: newsData.title,
          text: newsData.subtitle,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href)
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleBackToHome = () => {
    // Fungsi untuk kembali ke homepage news
    alert("Navigasi ke halaman homepage news")
    // Dalam implementasi nyata, bisa menggunakan router
    // router.push('/') atau window.location.href = '/'
  }

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Anda",
        avatar: "A",
        avatarBg: "bg-blue-600",
        time: "Baru saja",
        content: newComment,
        likes: 0,
        liked: false
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  interface Comment {
  id: number;
  liked: boolean;
  likes: number;
  }

const handleLikeComment = (commentId: number) => {
  setComments(comments.map(comment => {
    if (comment.id === commentId) {
      const wasLiked = comment.liked; // simpan nilai lama
      return {
        ...comment,
        liked: !wasLiked,
        likes: wasLiked ? comment.likes - 1 : comment.likes + 1,
      };
    }
    return comment;
  }));
};



  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back Button Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Kembali ke News Page</span>
            </button>
            <div className="ml-8 flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">ML</span>
              </div>
              <span className="text-lg font-semibold text-slate-900">Mersif Lab</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <button 
            onClick={handleBackToHome}
            className="hover:text-slate-700 transition-colors"
          >
            Beranda
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-600">Teknologi</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium">Artikel</span>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
            {newsData.category}
          </span>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {newsData.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">{newsData.subtitle}</p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">ML</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">Oleh {newsData.author}</p>
                <p className="text-slate-500">{newsData.publishedDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{newsData.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{newsData.views} views</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pb-8 border-b border-slate-200">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span className="font-medium">Bagikan</span>
            </button>
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors shadow-sm ${
                isBookmarked ? "bg-slate-900 text-white" : "bg-white border border-slate-300 hover:bg-slate-50"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="font-medium">{isBookmarked ? "Disimpan" : "Simpan"}</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="relative">
            <div className="h-64 md:h-96 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-700/90 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4 opacity-60">🚀</div>
                  <p className="text-xl font-semibold">Revolusi Digital Indonesia 2024</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3 text-center">
              Transformasi digital mengubah lanskap bisnis Indonesia
            </p>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg prose-slate max-w-none">
          {newsData.content.map((paragraph, index) => (
            <p key={index} className="mb-6 text-slate-700 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Komentar ({comments.length})
            </h3>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{showComments ? "Sembunyikan" : "Tampilkan"} Komentar</span>
            </button>
          </div>

          {/* Comment Form */}
          <div className="mb-8">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tulis komentar Anda..."
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20"
                    rows="3"
                  />
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-slate-500">
                      Berikan komentar yang konstruktif dan sopan
                    </p>
                    <button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim()}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          {showComments && (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white p-6 rounded-lg border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${comment.avatarBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-sm">{comment.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <p className="font-medium text-slate-900">{comment.author}</p>
                        <p className="text-slate-500 text-sm">{comment.time}</p>
                      </div>
                      <p className="text-slate-700 leading-relaxed mb-4">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center gap-2 text-sm transition-colors ${
                            comment.liked 
                              ? 'text-red-600 hover:text-red-700' 
                              : 'text-slate-500 hover:text-red-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${comment.liked ? 'fill-current' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
                          Balas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Related News */}
      <aside className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Artikel Terkait</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsData.relatedNews.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="bg-slate-100 h-48 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl opacity-40">📰</span>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{item.category}</span>
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default NewsDetailPage