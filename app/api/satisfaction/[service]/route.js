import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/initialization";

// Fungsi menghitung total skor dari answers
const hitungTotalSkor = (answers) => {
  // Jika answers adalah string (JSON), parse dulu
  if (typeof answers === "string") {
    try {
      answers = JSON.parse(answers);
    } catch {
      return 0;
    }
  }

  // Jika answers bukan array, kembalikan 0
  if (!Array.isArray(answers)) return 0;

  // Hitung total nilai dari semua answer
  return answers.reduce((total, answer) => {
    // Support berbagai format answer:
    // 1. Format object { value: number }
    // 2. Format array [value1, value2, ...]
    // 3. Langsung nilai number
    const nilai = answer?.value ?? answer;
    return total + (Number(nilai) || 0);
  }, 0);
};

export const GET = async (request, { params }) => {
  const { service } = params;
  const namaPoli = decodeURIComponent(service);

  try {
    // 1. Ambil semua answers dari poli tertentu
    const responses = await prisma.patient.findMany({
      where: {
        services_received: {
          equals: namaPoli,
          mode: "insensitive",
        },
      },
      select: {
        answers: true, // Hanya ambil kolom answers
      },
    });

    // 2. Hitung jumlah responden per kategori
    let sangatPuas = 0;
    let puas = 0;
    let kurangPuas = 0;
    let tidakPuas = 0;

    responses.forEach((response) => {
      const totalSkor = hitungTotalSkor(response.answers);
      const rataRata = totalSkor / 9; // Asumsi ada 9 pertanyaan

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

    // 3. Return hasil dalam format yang diminta
    return NextResponse.json(
      {
        service: namaPoli,
        sangatPuas,
        puas,
        kurangPuas,
        tidakPuas,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        service: namaPoli,
        sangatPuas: 0,
        puas: 0,
        kurangPuas: 0,
        tidakPuas: 0,
        error: "Terjadi kesalahan dalam perhitungan",
      },
      { status: 500 }
    );
  }
};
