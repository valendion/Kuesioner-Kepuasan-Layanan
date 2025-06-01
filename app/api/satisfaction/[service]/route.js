import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/initialization";

export const GET = async (request, { params }) => {
  const { service } = params;

  try {
    const patients = await prisma.patient.findMany({
      where: {
        services_received: {
          equals: decodeURIComponent(service),
          mode: "insensitive", // untuk case insensitive search
        },
      },
    });

    if (patients.length === 0) {
      return NextResponse.json(
        { error: "No patients found with the specified service" },
        { status: 404 }
      );
    }

    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch patients by service" },
      { status: 500 }
    );
  }
};
