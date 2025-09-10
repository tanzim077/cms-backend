import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'Administrator with full access',
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User',
      description: 'Standard user with limited access',
    },
  });

  // Create permissions
  const permissions = [
    // Admin permissions
    {
      title: 'Create User',
      code: 'admin.user.create',
      description: 'Allows creating a new user.',
    },
    {
      title: 'Read User',
      code: 'admin.user.read',
      description: 'Allows viewing user details.',
    },
    {
      title: 'Update User',
      code: 'admin.user.update',
      description: 'Allows editing user details.',
    },
    {
      title: 'Delete User',
      code: 'admin.user.delete',
      description: 'Allows deleting a user.',
    },
    {
      title: 'Create Role',
      code: 'admin.role.create',
      description: 'Allows creating a new role.',
    },
    {
      title: 'Read Role',
      code: 'admin.role.read',
      description: 'Allows viewing role details.',
    },
    {
      title: 'Update Role',
      code: 'admin.role.update',
      description: 'Allows editing role details.',
    },
    {
      title: 'Delete Role',
      code: 'admin.role.delete',
      description: 'Allows deleting a role.',
    },
    {
      title: 'Create Course',
      code: 'admin.course.create',
      description: 'Allows creating a new course.',
    },
    {
      title: 'Read Course',
      code: 'admin.course.read',
      description: 'Allows viewing course details.',
    },
    {
      title: 'Update Course',
      code: 'admin.course.update',
      description: 'Allows editing course details.',
    },
    {
      title: 'Delete Course',
      code: 'admin.course.delete',
      description: 'Allows deleting a course.',
    },

    // User permissions
    {
      title: 'Read Course',
      code: 'user.course.read',
      description: 'Allows viewing course details.',
    },
    {
      title: 'Read Profile',
      code: 'user.profile.read',
      description: 'Allows viewing own profile.',
    },
    {
      title: 'Update Profile',
      code: 'user.profile.update',
      description: 'Allows updating own profile.',
    },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { code: permission.code },
      update: {},
      create: permission,
    });
  }

  // Assign permissions to roles
  const adminPermissions = await prisma.permission.findMany({
    where: {
      code: {
        startsWith: 'admin.',
      },
    },
  });

  const userPermissions = await prisma.permission.findMany({
    where: {
      code: {
        startsWith: 'user.',
      },
    },
  });

  for (const permission of adminPermissions) {
    await prisma.roleAllowedPermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  for (const permission of userPermissions) {
    await prisma.roleAllowedPermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: userRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: userRole.id,
        permissionId: permission.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
