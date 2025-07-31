"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { markMessageAsRead, deleteContactMessage } from "@/app/admin/contact-messages/actions"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  received_at: string
  is_read: boolean
}

const initialMessages: ContactMessage[] = [
  {
    id: "msg1",
    name: "Budi Santoso",
    email: "budi.s@example.com",
    message: "Saya ingin bertanya tentang program Mersif Academy. Apakah ada diskon untuk pendaftaran grup?",
    received_at: "2025-07-29T14:30:00Z",
    is_read: false,
  },
  {
    id: "msg2",
    name: "Siti Aminah",
    email: "siti.a@example.com",
    message: "Bagaimana cara mendaftar untuk pelatihan IoT?",
    received_at: "2025-07-28T09:15:00Z",
    is_read: true,
  },
  {
    id: "msg3",
    name: "Joko Susilo",
    email: "joko.s@example.com",
    message: "Apakah Mersif Lab menyediakan layanan konsultasi untuk implementasi AI di perusahaan?",
    received_at: "2025-07-27T11:00:00Z",
    is_read: false,
  },
]

export function ContactMessagesCrud() {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages)
  const [isViewMessageDialogOpen, setIsViewMessageDialogOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const handleMarkAsRead = async (id: string) => {
    const success = await markMessageAsRead(id)
    if (success) {
      setMessages(messages.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg)))
      toast({
        title: "Success!",
        description: "Message marked as read.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to mark message as read.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      const success = await deleteContactMessage(id)
      if (success) {
        setMessages(messages.filter((msg) => msg.id !== id))
        toast({
          title: "Success!",
          description: "Message deleted successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete message.",
          variant: "destructive",
        })
      }
    }
  }

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setIsViewMessageDialogOpen(true)
    if (!message.is_read) {
      handleMarkAsRead(message.id) // Automatically mark as read when viewed
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Contact Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject (First few words)</TableHead>
              <TableHead>Received At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id} className={!message.is_read ? "bg-blue-50/50" : ""}>
                <TableCell>
                  <Badge variant={message.is_read ? "secondary" : "default"}>
                    {message.is_read ? "Read" : "Unread"}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.message.substring(0, 50)}...</TableCell>
                <TableCell>{new Date(message.received_at).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewMessage(message)}>View Message</DropdownMenuItem>
                      {!message.is_read && (
                        <DropdownMenuItem onClick={() => handleMarkAsRead(message.id)}>Mark as Read</DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleDelete(message.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isViewMessageDialogOpen} onOpenChange={setIsViewMessageDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
              <DialogDescription>
                Email: {selectedMessage?.email} | Received:{" "}
                {selectedMessage?.received_at ? new Date(selectedMessage.received_at).toLocaleString() : ""}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="whitespace-pre-wrap">{selectedMessage?.message}</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewMessageDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
