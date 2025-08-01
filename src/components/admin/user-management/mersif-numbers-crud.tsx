"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { updateMersifNumber } from "@/app/admin/mersif-numbers/action"
// import { toast } from "@/hooks/use-toast"
import { toast } from "@/components/ui/use-toast"

interface MersifNumber {
  id: string
  label: string
  value: string
}

const initialMersifNumbers: MersifNumber[] = [
  { id: "1", label: "Siswa Tercapai", value: "15,000+" },
  { id: "2", label: "Guru Terlatih", value: "200+" },
  { id: "3", label: "Mitra Institusional", value: "30+" },
  { id: "4", label: "Negara", value: "3" },
]

export function MersifNumbersCrud() {
  const [mersifNumbers, setMersifNumbers] = useState<MersifNumber[]>(initialMersifNumbers)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [currentValue, setCurrentValue] = useState<string>("")

  const handleEdit = (id: string, value: string) => {
    setEditingId(id)
    setCurrentValue(value)
  }

  const handleSave = async (id: string) => {
    const updated = await updateMersifNumber(id, currentValue)
    if (updated) {
      setMersifNumbers(mersifNumbers.map((num) => (num.id === id ? { ...num, value: currentValue } : num)))
      setEditingId(null)
      setCurrentValue("")
      toast({
        title: "Success!",
        description: "Mersif Number updated successfully.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to update Mersif Number.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setCurrentValue("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Mersif Numbers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mersifNumbers.map((num) => (
              <TableRow key={num.id}>
                <TableCell className="font-medium">{num.label}</TableCell>
                <TableCell>
                  {editingId === num.id ? (
                    <Input value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} className="w-40" />
                  ) : (
                    num.value
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === num.id ? (
                    <>
                      <Button variant="ghost" size="sm" onClick={() => handleSave(num.id)}>
                        Save
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(num.id, num.value)}>
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
