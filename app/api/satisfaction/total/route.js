import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/initialization";
import { roomPublicHealth } from "@/app/utils/contans";

export const GET = async () => {
  try {
    const counts = {};

    for (const poli of roomPublicHealth) {
      const count = await prisma.patient.count({
        where: { services_received: poli },
      });
      counts[poli] = count;
    }

    return NextResponse.json({
      data: counts,
      total: Object.values(counts).reduce((a, b) => a + b, 0),
      status: "success",
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Failed to fetch survey counts", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
