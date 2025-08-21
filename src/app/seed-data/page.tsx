"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function SeedDataPage() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const seedServices = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/services/seed', {
          method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          services: [
            {
              name: "Mersif Academy",
              description: "Platform pembelajaran online yang inovatif dengan teknologi terkini",
              image: "/img/service/mersifacademy.svg",
              link: "/mersifacademy",
              sortOrder: 1
            },
            {
              name: "Mersif IoT",
              description: "Solusi Internet of Things untuk berbagai kebutuhan industri",
              image: "/img/service/mersifiot.svg",
              link: "/mersifiot",
              sortOrder: 2
            },
            {
              name: "Mersif Creator Room",
              description: "Platform kreasi ruang virtual yang memungkinkan kolaborasi kreatif",
              image: "/img/service/mersifcreator-img.svg",
              link: "/mersifcreator",
              sortOrder: 3
            },
            {
              name: "Mersif Vista",
              description: "Visualisasi data dan analytics yang powerful dan mudah digunakan",
              image: "/img/service/mersifvista.svg",
              link: "/mersifvista",
              sortOrder: 4
            },
            {
              name: "Mersif Mobile Apps",
              description: "Aplikasi mobile yang responsif dan user-friendly untuk semua kebutuhan",
              image: "/img/service/mersifiot-img.svg",
              link: "/mersifcreator",
              sortOrder: 5
            }
          ]
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Services data seeded successfully!",
        })
      } else {
        throw new Error(result.error || 'Failed to seed services')
      }
    } catch (error) {
      console.error('Error seeding services:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to seed services",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Seed Data</h1>
      
      <div className="grid gap-6">
        <Card>
        <CardHeader>
            <CardTitle>Services</CardTitle>
            <CardDescription>
              Add default services data to the database with correct image paths
            </CardDescription>
        </CardHeader>
          <CardContent>
          <Button 
              onClick={seedServices} 
            disabled={loading}
            className="w-full"
          >
              {loading ? "Seeding..." : "Seed Services Data"}
          </Button>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}