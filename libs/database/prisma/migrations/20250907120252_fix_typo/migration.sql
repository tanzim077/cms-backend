/*
  Warnings:

  - You are about to drop the column `access_tokens` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_tokens` on the `Auth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Auth" DROP COLUMN "access_tokens",
DROP COLUMN "refresh_tokens",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "refresh_token" TEXT;
