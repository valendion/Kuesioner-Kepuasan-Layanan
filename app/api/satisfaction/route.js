import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  const res = await prisma.patient.findMany();
  return NextResponse.json(res, { status: 200 });
};

export const POST = async (request) => {
  const body = await request.json();
  const patient = await prisma.patient.create({
    data: {
      age: body.age,
      gender: body.gender,
      education: body.education,
      occupation: body.occupation,
      services_received: body.services_received,
      answers: body.answers,
    },
  });
  return NextResponse.json(patient);
};
