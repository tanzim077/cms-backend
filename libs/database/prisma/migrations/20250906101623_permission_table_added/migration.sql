/*
  Warnings:

  - You are about to drop the column `allowedPermissionId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `restrictedPermissionId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `_AllowedPermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RestrictedPermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_AllowedPermissions" DROP CONSTRAINT "_AllowedPermissions_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AllowedPermissions" DROP CONSTRAINT "_AllowedPermissions_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RestrictedPermissions" DROP CONSTRAINT "_RestrictedPermissions_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RestrictedPermissions" DROP CONSTRAINT "_RestrictedPermissions_B_fkey";

-- AlterTable
ALTER TABLE "public"."Role" DROP COLUMN "allowedPermissionId",
DROP COLUMN "restrictedPermissionId";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_blocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nid_no" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "verication_document" TEXT;

-- DropTable
DROP TABLE "public"."_AllowedPermissions";

-- DropTable
DROP TABLE "public"."_RestrictedPermissions";

-- CreateTable
CREATE TABLE "public"."RoleAllowedPermission" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoleAllowedPermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "public"."RoleRestrictedPermission" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoleRestrictedPermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "public"."UserVerificationDocument" (
    "id" SERIAL NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "id_no" TEXT,
    "id_type" TEXT,
    "verication_document_link" TEXT,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserVerificationDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVerificationDocument_user_id_key" ON "public"."UserVerificationDocument"("user_id");

-- AddForeignKey
ALTER TABLE "public"."RoleAllowedPermission" ADD CONSTRAINT "RoleAllowedPermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoleAllowedPermission" ADD CONSTRAINT "RoleAllowedPermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoleRestrictedPermission" ADD CONSTRAINT "RoleRestrictedPermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoleRestrictedPermission" ADD CONSTRAINT "RoleRestrictedPermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserVerificationDocument" ADD CONSTRAINT "UserVerificationDocument_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
