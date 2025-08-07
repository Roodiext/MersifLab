import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function POST() {
  try {
    const testimonials = [
      {
        name: "Dr. Ahmad Fauzi",
        role: "Dosen Teknik Elektro ITB",
        initials: "AF",
        text: "Platform MersifLab sangat membantu mahasiswa memahami konsep elektronika dengan simulasi yang realistis."
      },
      {
        name: "Siti Nurhaliza",
        role: "Guru Fisika SMAN 1 Jakarta",
        initials: "SN",
        text: "Laboratorium virtual ini membuat pembelajaran fisika menjadi lebih menarik dan interaktif."
      },
      {
        name: "Prof. Budi Santoso",
        role: "Kepala Lab Kimia UGM",
        initials: "BS",
        text: "Eksperimen kimia virtual sangat aman dan efektif untuk pembelajaran jarak jauh."
      },
      {
        name: "Maya Sari",
        role: "Mahasiswa Teknik Informatika",
        initials: "MS",
        text: "Interface yang user-friendly membuat saya mudah memahami konsep programming."
      },
      {
        name: "Rizki Pratama",
        role: "Siswa SMK Teknik",
        initials: "RP",
        text: "Simulasi mesin dan alat teknik sangat membantu persiapan praktik industri."
      },
      {
        name: "Dr. Linda Wijaya",
        role: "Peneliti LIPI",
        initials: "LW",
        text: "Kualitas simulasi sangat mendekati kondisi laboratorium sesungguhnya."
      },
      {
        name: "Andi Kurniawan",
        role: "Instruktur Pelatihan",
        initials: "AK",
        text: "Platform ini sangat efektif untuk pelatihan teknis karyawan industri."
      },
      {
        name: "Dewi Lestari",
        role: "Guru Biologi SMA",
        initials: "DL",
        text: "Simulasi biologi molekuler membantu siswa memvisualisasikan proses yang kompleks."
      },
      {
        name: "Hendra Gunawan",
        role: "Teknisi Lab Universitas",
        initials: "HG",
        text: "Maintenance virtual lab lebih mudah dan cost-effective dibanding lab fisik."
      },
      {
        name: "Fatimah Zahra",
        role: "Mahasiswa Kedokteran",
        initials: "FZ",
        text: "Simulasi anatomi 3D sangat membantu memahami struktur tubuh manusia."
      },
      {
        name: "Agus Setiawan",
        role: "Kepala Sekolah SMK",
        initials: "AS",
        text: "Investasi terbaik untuk meningkatkan kualitas pendidikan teknik di sekolah kami."
      },
      {
        name: "Rina Marlina",
        role: "Dosen Matematika",
        initials: "RM",
        text: "Visualisasi konsep matematika abstrak menjadi lebih mudah dipahami siswa."
      },
      {
        name: "Bambang Sutrisno",
        role: "Engineer PT. Teknologi Maju",
        initials: "BS",
        text: "Platform ini sangat membantu training engineer baru di perusahaan kami."
      },
      {
        name: "Indira Sari",
        role: "Mahasiswa Arsitektur",
        initials: "IS",
        text: "Simulasi struktur bangunan membantu memahami prinsip konstruksi dengan baik."
      },
      {
        name: "Yudi Hermawan",
        role: "Guru Kimia SMK",
        initials: "YH",
        text: "Eksperimen virtual mengurangi risiko kecelakaan lab dan lebih ekonomis."
      },
      {
        name: "Sari Dewi",
        role: "Peneliti Startup EdTech",
        initials: "SD",
        text: "Innovation terdepan dalam bidang educational technology di Indonesia."
      },
      {
        name: "Doni Prasetyo",
        role: "Mahasiswa Teknik Mesin",
        initials: "DP",
        text: "Simulasi mesin industri sangat detail dan membantu pemahaman praktis."
      },
      {
        name: "Lina Kartika",
        role: "Koordinator Lab Sekolah",
        initials: "LK",
        text: "Solusi sempurna untuk sekolah yang memiliki keterbatasan fasilitas lab."
      },
      {
        name: "Rudi Hartono",
        role: "Trainer Industri 4.0",
        initials: "RH",
        text: "Platform yang sangat sesuai dengan kebutuhan era digital dan industri 4.0."
      }
    ]

    // Clear existing testimonials
    await query("DELETE FROM testimonials")

    // Insert new testimonials
    for (let i = 0; i < testimonials.length; i++) {
      const testimonial = testimonials[i]
      await query(
        "INSERT INTO testimonials (name, role, initials, text, sortOrder) VALUES (?, ?, ?, ?, ?)",
        [testimonial.name, testimonial.role, testimonial.initials, testimonial.text, i + 1]
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "19 testimonials created successfully" 
    })
  } catch (error: any) {
    console.error("Seed error:", error)
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 })
  }
}