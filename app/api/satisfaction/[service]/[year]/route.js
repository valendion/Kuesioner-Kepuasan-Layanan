import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/initialization";
import { parsePostgresArray } from "@/app/utils/convert";

const hitungTotalSkor = (answers) => {
  if (typeof answers === "string") {
    if (answers.startsWith("{") && answers.endsWith("}")) {
      answers = parsePostgresArray(answers);
    } else {
      try {
        answers = JSON.parse(answers);
      } catch {
        return 0;
      }
    }
  }

  if (!Array.isArray(answers)) return 0;

  return answers.reduce((total, answer) => {
    const nilai = answer?.value ?? answer;
    return total + (Number(nilai) || 0);
  }, 0);
};

export const GET = async (request, { params }) => {
  const { service, year } = params;
  const namaPoli = decodeURIComponent(service);
  const tahun = decodeURIComponent(year);

  try {
    const responses = await prisma.patient.findMany({
      where: {
        services_received: {
          // Pastikan ini sesuai dengan nama field di model
          equals: namaPoli,
          mode: "insensitive",
        },
        createdAt: {
          // Diubah dari created_at ke createdAt
          gte: new Date(`${tahun}-01-01`),
          lt: new Date(`${parseInt(tahun) + 1}-01-01`),
        },
      },
      select: {
        answers: true,
        createdAt: true, // Diubah dari created_at ke createdAt
      },
    });

    let sangatPuas = 0;
    let puas = 0;
    let kurangPuas = 0;
    let tidakPuas = 0;

    responses.forEach((response) => {
      const totalSkor = hitungTotalSkor(response.answers);
      const rataRata = totalSkor / 9;

      if (rataRata === 4) {
        sangatPuas++;
      } else if (rataRata >= 3) {
        puas++;
      } else if (rataRata >= 2) {
        kurangPuas++;
      } else if (rataRata >= 1) {
        tidakPuas++;
      }
    });

    return NextResponse.json(
      {
        service: namaPoli,
        year: tahun,
        sangatPuas,
        puas,
        kurangPuas,
        tidakPuas,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        service: namaPoli,
        year: tahun,
        sangatPuas: 0,
        puas: 0,
        kurangPuas: 0,
        tidakPuas: 0,
        error: "Terjadi kesalahan dalam perhitungan",
      },
      { status: 500 },
    );
  }
};
