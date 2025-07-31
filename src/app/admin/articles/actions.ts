"use server"

interface ArticleData {
  id?: string
  title: string
  content: string
  image_url: string
  published_date: string
  category: string
}

// In a real application, you would interact with a database here.
// For demonstration, we'll simulate data operations.

let articles: ArticleData[] = [
  {
    id: "1",
    title: "Potensi Kerja Sama Berkelanjutan MersifLab",
    content:
      "Surakarta - Kesuksesan workshop 3D printing yang dilaksanakan di SMP Negeri 13 Surakarta melibatkan tim MersifLab sebagai...",
    image_url: "/placeholder.svg?height=100&width=150",
    published_date: "2025-06-25T10:00:00Z",
    category: "Partnership",
  },
  {
    id: "2",
    title: "Hari ke-2: MersifLab Menjadi Narasumber Peningkatan...",
    content:
      "Surakarta - Hari kedua Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP...",
    image_url: "/placeholder.svg?height=100&width=150",
    published_date: "2025-06-24T10:00:00Z",
    category: "Event",
  },
  {
    id: "3",
    title: "Hari ke-1: MersifLab Menjadi Narasumber Peningkatan...",
    content:
      "Surakarta - Pada hari pertama Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP...",
    image_url: "/placeholder.svg?height=100&width=150",
    published_date: "2025-06-23T10:00:00Z",
    category: "Event",
  },
]

export async function createOrUpdateArticle(data: ArticleData): Promise<boolean> {
  console.log("Simulating create/update article:", data)
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

  if (data.id) {
    // Update existing article
    const index = articles.findIndex((a) => a.id === data.id)
    if (index !== -1) {
      articles[index] = { ...articles[index], ...data }
      console.log("Article updated (simulated).")
      return true
    }
    return false // Article not found
  } else {
    // Create new article
    const newId = (articles.length + 1).toString()
    articles.push({ ...data, id: newId })
    console.log("Article created (simulated).")
    return true
  }
}

export async function deleteArticle(id: string): Promise<boolean> {
  console.log(`Simulating delete article with ID: ${id}`)
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

  const initialLength = articles.length
  articles = articles.filter((article) => article.id !== id)
  if (articles.length < initialLength) {
    console.log("Article deleted (simulated).")
    return true
  } else {
    console.error("Failed to delete article (simulated). Article not found.")
    return false
  }
}

export async function getArticles(): Promise<ArticleData[]> {
  console.log("Simulating fetching articles.")
  await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate network delay
  return articles
}
