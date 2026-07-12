import { prisma } from "@/app/lib/prisma/initialization";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month") || "all";
    const year = searchParams.get("year") || String(new Date().getFullYear());

    const yearInt = parseInt(year);
    if (isNaN(yearInt)) {
      return NextResponse.json({ error: "Invalid year parameter" }, { status: 400 });
    }

    const whereClause = {};

    if (month === "all") {
      whereClause.createdAt = {
        gte: new Date(Date.UTC(yearInt, 0, 1)),
        lt: new Date(Date.UTC(yearInt + 1, 0, 1)),
      };
    } else {
      const monthInt = parseInt(month);
      if (isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
        return NextResponse.json({ error: "Invalid month parameter" }, { status: 400 });
      }
      whereClause.createdAt = {
        gte: new Date(Date.UTC(yearInt, monthInt - 1, 1)),
        lt: new Date(Date.UTC(yearInt, monthInt, 1)),
      };
    }

    const patients = await prisma.patient.findMany({
      where: whereClause,
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ data: patients }, { status: 200 });
  } catch (error) {
    console.error("Error fetching report data:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
};
