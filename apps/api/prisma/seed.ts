// apps/api/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --- Branch (idempotent) ---
  await prisma.branch.upsert({
    where: { name: 'Head Office' },
    update: {},
    create: { name: 'Head Office' },
  });

  // --- Products (EV vertical) ---
  await prisma.product.createMany({
    data: [{ name: 'EV-2W' }, { name: 'EV-3W' }, { name: 'EV-4W' }],
    skipDuplicates: true,
  });

  // --- Minimal chart of accounts ---
  await prisma.glAccount.createMany({
    data: [
      { code: '1000', name: 'Cash', type: 'ASSET' },
      { code: '2000', name: 'Loans Payable', type: 'LIABILITY' },
      { code: '3000', name: 'Interest Income', type: 'INCOME' },
      { code: '4000', name: 'Operating Expense', type: 'EXPENSE' },
    ],
    skipDuplicates: true,
  });

  // TODO (next PR): seed users, roles, permissions, user_roles, role_permissions, token_blacklist
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
