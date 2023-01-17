/*
  Warnings:

  - You are about to alter the column `pixKey` on the `Recipient` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(140)`.
  - You are about to alter the column `email` on the `Recipient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(250)`.

*/
-- AlterTable
ALTER TABLE "Recipient" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "pixKey" SET DATA TYPE VARCHAR(140),
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "bankAccountCode" DROP NOT NULL,
ALTER COLUMN "bankAccountAgency" DROP NOT NULL,
ALTER COLUMN "bankAccountNumber" DROP NOT NULL,
ALTER COLUMN "bankAccountType" DROP NOT NULL;
