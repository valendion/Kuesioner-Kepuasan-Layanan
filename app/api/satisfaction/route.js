import { prisma } from "@/app/lib/prisma/initialization";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json();

    const patient = await prisma.patient.create({
      data: {
        age: Number(body.age),
        gender: body.gender,
        education: body.education,
        occupation: body.occupation,
        services_received: body.services_received,
        answers: JSON.stringify(body.answers),
        suggestion: body.suggestion || null,
      },
    });

    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
