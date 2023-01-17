/*
  Warnings:

  - The primary key for the `Recipient` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Recipient" DROP CONSTRAINT "Recipient_pkey",
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "federalId" SET DATA TYPE TEXT,
ALTER COLUMN "personNature" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DATA TYPE TEXT,
ALTER COLUMN "pixKey" SET DATA TYPE TEXT,
ALTER COLUMN "pixKeyType" SET DATA TYPE TEXT,
ALTER COLUMN "bankAccountCode" SET DATA TYPE TEXT,
ALTER COLUMN "bankAccountAgency" SET DATA TYPE TEXT,
ALTER COLUMN "bankAccountNumber" SET DATA TYPE TEXT,
ALTER COLUMN "bankAccountType" SET DATA TYPE TEXT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id");
