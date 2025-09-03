"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Mail, MoreHorizontal, Trash2, Eye, Clock, Reply } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContactMessage {
  id: number
  name: string
  email: string
  message: string
  status: "unread" | "read" | "replied"
  createdAt: string
  updatedAt: string
}

interface ContactMessagesData {
  messages: ContactMessage[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  counts: {
    total: number
    unread: number
    read: number
    replied: number
  }
}

export default function ContactMessagesPage() {
  const [data, setData] = useState<ContactMessagesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const fetchMessages = async (status = "all") => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/contact-messages?status=${status}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat pesan contact",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages(activeTab)
  }, [activeTab])

  const updateMessageStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/contact-messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "Status pesan berhasil diupdate",
        })
        fetchMessages(activeTab)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengupdate status pesan",
        variant: "destructive",
      })
    }
  }

  const deleteMessage = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/contact-messages/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "Pesan berhasil dihapus",
        })
        fetchMessages(activeTab)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus pesan",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return (
          <Badge variant="destructive">
            <Clock className="w-3 h-3 mr-1" />
            Belum Dibaca
          </Badge>
        )
      case "read":
        return (
          <Badge variant="secondary">
            <Eye className="w-3 h-3 mr-1" />
            Sudah Dibaca
          </Badge>
        )
      case "replied":
        return (
          <Badge variant="default">
            <Reply className="w-3 h-3 mr-1" />
            Sudah Dibalas
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Memuat pesan...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Pesan Contact</h1>
          <p className="text-muted-foreground">Kelola pesan yang masuk dari form contact</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">Semua ({data?.counts.total || 0})</TabsTrigger>
          <TabsTrigger value="unread">Belum Dibaca ({data?.counts.unread || 0})</TabsTrigger>
          <TabsTrigger value="read">Sudah Dibaca ({data?.counts.read || 0})</TabsTrigger>
          <TabsTrigger value="replied">Sudah Dibalas ({data?.counts.replied || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {data?.messages.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <div className="text-center">
                  <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Tidak ada pesan</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            data?.messages.map((message) => (
              <Card key={message.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      <CardDescription>{message.email}</CardDescription>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(message.status)}
                        <span className="text-sm text-muted-foreground">{formatDate(message.createdAt)}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateMessageStatus(message.id, "read")}>
                          <Eye className="w-4 h-4 mr-2" />
                          Tandai Sudah Dibaca
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateMessageStatus(message.id, "replied")}>
                          <Reply className="w-4 h-4 mr-2" />
                          Tandai Sudah Dibalas
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Hapus Pesan
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Pesan</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus pesan dari {message.name}? Tindakan ini tidak dapat
                                dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteMessage(message.id)}>Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{message.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
