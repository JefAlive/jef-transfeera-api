/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Recipient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "federalId" VARCHAR(255) NOT NULL,
    "personNature" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "pixKey" VARCHAR(255) NOT NULL,
    "pixKeyType" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "bankAccountCode" VARCHAR(255) NOT NULL,
    "bankAccountAgency" VARCHAR(255) NOT NULL,
    "bankAccountNumber" VARCHAR(255) NOT NULL,
    "bankAccountType" VARCHAR(255) NOT NULL,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id")
);
