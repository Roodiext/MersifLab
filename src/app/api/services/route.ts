import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
