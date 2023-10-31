-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "age" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "services_received" TEXT NOT NULL,
    "answers" INTEGER[],
    "suggestion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
