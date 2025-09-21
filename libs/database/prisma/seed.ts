import { PrismaClient, RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // --- Permissions ---
  const permissions = await prisma.permission.createMany({
    data: [
      { code: 'user:create', description: 'user:create' },
      { code: 'user:update', description: 'user:update' },
      { code: 'user:delete', description: 'user:delete' },
      { code: 'user:view', description: 'user:view' },
      { code: 'role:create', description: 'role:create' },
      { code: 'role:update', description: 'role:update' },
      { code: 'role:delete', description: 'role:delete' },
      { code: 'role:view', description: 'role:view' },
      { code: 'role:assign', description: 'role:assign' },
      { code: 'permission:view', description: 'permission:view' },
      { code: 'permission:assign', description: 'permission:assign' },
    ],
    skipDuplicates: true,
  });

  // --- Roles ---
  const adminRole = await prisma.role.upsert({
    where: { name: RoleEnum.ADMIN },
    update: {},
    create: { name: RoleEnum.ADMIN },
  });

  const userRole = await prisma.role.upsert({
    where: { name: RoleEnum.USER },
    update: {},
    create: { name: RoleEnum.USER },
  });

  // --- Attach permissions to Admin role ---
  const allPermissions = await prisma.permission.findMany();
  for (const perm of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: perm.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: perm.id,
        allowed: true,
      },
    });
  }

  // --- Users ---
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash('12345', salt);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@gmail.com',
      name: 'Super Admin',
      password: hashedPassword,
    },
  });

  await prisma.userRole.create({
    data: {
      user_id: adminUser.id,
      role_id: adminRole.id,
    },
  });
  //
  // await prisma.user.upsert({
  //   where: { email: 'user@example.com' },
  //   update: {},
  //   create: {
  //     email: 'user@example.com',
  //     name: 'Normal User',
  //     roleId: userRole.id,
  //   },
  // });

  console.log('✅ Seed data inserted successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
