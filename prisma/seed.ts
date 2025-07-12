import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Создаем предметы
  const items = await Promise.all([
    // Обычные предметы
    prisma.item.create({
      data: {
        name: 'AK-47 | Redline',
        description: 'Автомат Калашникова с красными полосами',
        image: '/images/placeholder.svg',
        rarity: 'RARE',
        type: 'WEAPON',
        price: 25.50,
      },
    }),
    prisma.item.create({
      data: {
        name: 'AWP | Dragon Lore',
        description: 'Легендарная снайперская винтовка',
        image: '/images/placeholder.svg',
        rarity: 'LEGENDARY',
        type: 'WEAPON',
        price: 2500.00,
      },
    }),
    prisma.item.create({
      data: {
        name: 'M4A4 | Howl',
        description: 'Штурмовая винтовка с воющим волком',
        image: '/images/placeholder.svg',
        rarity: 'LEGENDARY',
        type: 'WEAPON',
        price: 1800.00,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Glock-18 | Water Elemental',
        description: 'Пистолет с водной стихией',
        image: '/images/placeholder.svg',
        rarity: 'UNCOMMON',
        type: 'WEAPON',
        price: 8.75,
      },
    }),
    prisma.item.create({
      data: {
        name: 'P250 | Sand Dune',
        description: 'Простой пистолет песочного цвета',
        image: '/images/placeholder.svg',
        rarity: 'COMMON',
        type: 'WEAPON',
        price: 0.50,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Karambit | Fade',
        description: 'Нож с переливающимся покрытием',
        image: '/images/placeholder.svg',
        rarity: 'MYTHICAL',
        type: 'KNIFE',
        price: 3200.00,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Bayonet | Doppler',
        description: 'Штык-нож с эффектом Доплера',
        image: '/images/placeholder.svg',
        rarity: 'MYTHICAL',
        type: 'KNIFE',
        price: 850.00,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Sport Gloves | Pandora\'s Box',
        description: 'Спортивные перчатки Пандоры',
        image: '/images/placeholder.svg',
        rarity: 'LEGENDARY',
        type: 'GLOVES',
        price: 1200.00,
      },
    }),
  ]);

  console.log('Items created:', items.length);

  // Создаем кейсы
  const cases = await Promise.all([
    prisma.case.create({
      data: {
        name: 'Weapon Case',
        description: 'Классический кейс с оружием CS2',
        image: '/images/placeholder.svg',
        price: 2.50,
      },
    }),
    prisma.case.create({
      data: {
        name: 'Knife Case',
        description: 'Редкий кейс с ножами и перчатками',
        image: '/images/placeholder.svg',
        price: 5.00,
      },
    }),
    prisma.case.create({
      data: {
        name: 'Operation Case',
        description: 'Специальный операционный кейс',
        image: '/images/placeholder.svg',
        price: 3.25,
      },
    }),
  ]);

  console.log('Cases created:', cases.length);

  // Связываем предметы с кейсами (CaseItem)
  const caseItems = [
    // Weapon Case
    { caseId: cases[0].id, itemId: items[0].id, dropRate: 25.0 }, // AK-47 Redline
    { caseId: cases[0].id, itemId: items[3].id, dropRate: 35.0 }, // Glock Water
    { caseId: cases[0].id, itemId: items[4].id, dropRate: 39.0 }, // P250 Sand
    { caseId: cases[0].id, itemId: items[1].id, dropRate: 1.0 },  // AWP Dragon Lore

    // Knife Case
    { caseId: cases[1].id, itemId: items[5].id, dropRate: 5.0 },  // Karambit Fade
    { caseId: cases[1].id, itemId: items[6].id, dropRate: 15.0 }, // Bayonet Doppler
    { caseId: cases[1].id, itemId: items[7].id, dropRate: 10.0 }, // Gloves Pandora
    { caseId: cases[1].id, itemId: items[0].id, dropRate: 70.0 }, // AK-47 Redline

    // Operation Case
    { caseId: cases[2].id, itemId: items[2].id, dropRate: 2.0 },  // M4A4 Howl
    { caseId: cases[2].id, itemId: items[1].id, dropRate: 1.0 },  // AWP Dragon Lore
    { caseId: cases[2].id, itemId: items[0].id, dropRate: 30.0 }, // AK-47 Redline
    { caseId: cases[2].id, itemId: items[3].id, dropRate: 67.0 }, // Glock Water
  ];

  for (const caseItem of caseItems) {
    await prisma.caseItem.create({
      data: caseItem,
    });
  }

  console.log('Case items created:', caseItems.length);

  // Создаем настройки
  const settings = [
    { key: 'site_name', value: 'CS2 Case Site', description: 'Название сайта' },
    { key: 'min_deposit', value: '5.00', description: 'Минимальная сумма пополнения' },
    { key: 'max_deposit', value: '1000.00', description: 'Максимальная сумма пополнения' },
    { key: 'withdrawal_fee', value: '0.05', description: 'Комиссия за вывод (5%)' },
  ];

  for (const setting of settings) {
    await prisma.settings.create({
      data: setting,
    });
  }

  console.log('Settings created:', settings.length);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });