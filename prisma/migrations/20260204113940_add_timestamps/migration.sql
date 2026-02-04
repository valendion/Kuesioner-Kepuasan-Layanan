/*
  Warnings:

  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Patient";

-- CreateTable
CREATE TABLE "patient" (
    "id" SERIAL NOT NULL,
    "age" INTEGER,
    "gender" VARCHAR(50),
    "education" VARCHAR(50),
    "occupation" VARCHAR(50),
    "services_received" VARCHAR(50),
    "answers" VARCHAR(50),
    "suggestion" VARCHAR(512),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);
