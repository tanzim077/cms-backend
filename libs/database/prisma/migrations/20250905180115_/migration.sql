/*
  Warnings:

  - You are about to drop the `_RoleAllowedPermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoleRestrictedPermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_RoleAllowedPermissions" DROP CONSTRAINT "_RoleAllowedPermissions_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RoleAllowedPermissions" DROP CONSTRAINT "_RoleAllowedPermissions_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RoleRestrictedPermissions" DROP CONSTRAINT "_RoleRestrictedPermissions_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RoleRestrictedPermissions" DROP CONSTRAINT "_RoleRestrictedPermissions_B_fkey";

-- DropTable
DROP TABLE "public"."_RoleAllowedPermissions";

-- DropTable
DROP TABLE "public"."_RoleRestrictedPermissions";

-- CreateTable
CREATE TABLE "public"."RolesOnAllowedPermissions" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "RolesOnAllowedPermissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "public"."RolesOnRestrictedPermissions" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "RolesOnRestrictedPermissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- AddForeignKey
ALTER TABLE "public"."RolesOnAllowedPermissions" ADD CONSTRAINT "RolesOnAllowedPermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RolesOnAllowedPermissions" ADD CONSTRAINT "RolesOnAllowedPermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RolesOnRestrictedPermissions" ADD CONSTRAINT "RolesOnRestrictedPermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RolesOnRestrictedPermissions" ADD CONSTRAINT "RolesOnRestrictedPermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
