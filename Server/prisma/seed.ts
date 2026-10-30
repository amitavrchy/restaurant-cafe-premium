import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.reservation.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuSection.deleteMany();
  await prisma.servicePeriod.deleteMany();
  await prisma.privateInquiry.deleteMany();
  await prisma.closure.deleteMany();
  await prisma.journalPost.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('Admin123!', 10);
  await prisma.user.create({
    data: {
      email: 'admin@maisonverdant.com',
      passwordHash,
      name: 'Maison Admin',
      role: 'ADMIN',
    },
  });

  await prisma.servicePeriod.createMany({
    data: [
      {
        name: 'Lunch',
        startTime: '12:00',
        endTime: '15:00',
        slotMinutes: 30,
        maxCovers: 40,
      },
      {
        name: 'Dinner',
        startTime: '18:00',
        endTime: '22:00',
        slotMinutes: 30,
        maxCovers: 60,
      },
    ],
  });

  const sections = [
    {
      slug: 'lunch',
      title: 'Lunch',
      sortOrder: 1,
      items: [
        {
          name: 'Velouté of Garden Pea',
          description: 'Crème fraîche, mint oil, toasted sourdough crumb',
          price: 18,
          dietary: ['VEGETARIAN', 'GLUTEN_FREE'],
          sortOrder: 1,
          imageUrl:
            'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80',
        },
        {
          name: 'Heritage Tomato Salad',
          description: 'Burrata, basil, aged balsamic, olive oil',
          price: 22,
          dietary: ['VEGETARIAN', 'GLUTEN_FREE'],
          sortOrder: 2,
          imageUrl:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
        },
        {
          name: 'Seared Day-Boat Scallops',
          description: 'Cauliflower purée, brown butter, capers',
          price: 34,
          dietary: ['GLUTEN_FREE'],
          sortOrder: 3,
          imageUrl:
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80',
        },
        {
          name: 'Roasted Chicken Breast',
          description: 'Morel jus, spring vegetables, potato confit',
          price: 32,
          dietary: ['NONE'],
          sortOrder: 4,
          imageUrl:
            'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&q=80',
        },
        {
          name: 'Lemon Verbena Tart',
          description: 'Candied zest, crème anglaise',
          price: 14,
          dietary: ['VEGETARIAN'],
          sortOrder: 5,
          imageUrl:
            'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=1200&q=80',
        },
      ],
    },
    {
      slug: 'dinner',
      title: 'Dinner',
      sortOrder: 2,
      items: [
        {
          name: 'Langoustine Crudo',
          description: 'Yuzu kosho, finger lime, cucumber essence',
          price: 28,
          dietary: ['GLUTEN_FREE'],
          sortOrder: 1,
          imageUrl:
            'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&q=80',
        },
        {
          name: 'Duck Breast à l’Orange',
          description: 'Blood orange glaze, endive, spiced jus',
          price: 48,
          dietary: ['GLUTEN_FREE'],
          sortOrder: 2,
          imageUrl:
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
        },
        {
          name: 'Dry-Aged Ribeye',
          description: 'Bone marrow butter, charred leeks, bordelaise',
          price: 62,
          dietary: ['NONE'],
          sortOrder: 3,
          imageUrl:
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80',
        },
        {
          name: 'Wild Mushroom Risotto',
          description: 'Parmesan veil, thyme, truffle oil',
          price: 36,
          dietary: ['VEGETARIAN', 'GLUTEN_FREE'],
          sortOrder: 4,
          imageUrl:
            'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1200&q=80',
        },
        {
          name: 'Chocolate Ganache',
          description: 'Olive oil ice cream, sea salt, cacao nib',
          price: 16,
          dietary: ['VEGETARIAN'],
          sortOrder: 5,
          imageUrl:
            'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&q=80',
        },
        {
          name: 'Halibut en Papillote',
          description: 'Fennel, white wine, citrus beurre blanc',
          price: 46,
          dietary: ['GLUTEN_FREE'],
          sortOrder: 6,
          imageUrl:
            'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200&q=80',
        },
      ],
    },
    {
      slug: 'tasting',
      title: 'Tasting',
      sortOrder: 3,
      items: [
        {
          name: 'Five-Course Tasting',
          description: 'Chef’s composition — seasonal narrative, wine pairing available',
          price: 125,
          dietary: ['NONE'],
          sortOrder: 1,
          imageUrl:
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
        },
        {
          name: 'Seven-Course Signature',
          description: 'Extended tasting with amuse and mignardises',
          price: 185,
          dietary: ['NONE'],
          sortOrder: 2,
          imageUrl:
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
        },
        {
          name: 'Vegetarian Tasting',
          description: 'Garden-led five courses, optional wine flight',
          price: 110,
          dietary: ['VEGETARIAN'],
          sortOrder: 3,
          imageUrl:
            'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80',
        },
        {
          name: 'Wine Pairing Flight',
          description: 'Sommelier selection matched to tasting courses',
          price: 75,
          dietary: ['VEGAN'],
          sortOrder: 4,
          imageUrl:
            'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=80',
        },
      ],
    },
    {
      slug: 'cafe',
      title: 'Café',
      sortOrder: 4,
      items: [
        {
          name: 'Single-Origin Espresso',
          description: 'Rotating estate beans, syrupy and bright',
          price: 5,
          dietary: ['VEGAN', 'GLUTEN_FREE'],
          sortOrder: 1,
          imageUrl:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
        },
        {
          name: 'Maison Flat White',
          description: 'Oat or dairy, microfoam, double ristretto',
          price: 6,
          dietary: ['VEGETARIAN', 'GLUTEN_FREE'],
          sortOrder: 2,
          imageUrl:
            'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=1200&q=80',
        },
        {
          name: 'Almond Financiers',
          description: 'Brown butter, toasted almond, seasonal jam',
          price: 8,
          dietary: ['VEGETARIAN'],
          sortOrder: 3,
          imageUrl:
            'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&q=80',
        },
        {
          name: 'Avocado Tartine',
          description: 'Sourdough, radish, chili crisp, soft egg',
          price: 16,
          dietary: ['VEGETARIAN'],
          sortOrder: 4,
          imageUrl:
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80',
        },
        {
          name: 'Matcha Madeleine',
          description: 'Ceremonial grade, white chocolate center',
          price: 7,
          dietary: ['VEGETARIAN'],
          sortOrder: 5,
          imageUrl:
            'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&q=80',
        },
      ],
    },
    {
      slug: 'wine',
      title: 'Wine',
      sortOrder: 5,
      items: [
        {
          name: 'Champagne — Grower Brut',
          description: 'Blanc de blancs, citrus peel, fine mousse',
          price: 22,
          dietary: ['VEGAN'],
          sortOrder: 1,
          imageUrl:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
        },
        {
          name: 'Chablis Premier Cru',
          description: 'Kimberlite minerality, green apple, chalk',
          price: 18,
          dietary: ['VEGAN'],
          sortOrder: 2,
          imageUrl:
            'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80',
        },
        {
          name: 'Pinot Noir — Burgundy',
          description: 'Red cherry, forest floor, silky tannin',
          price: 24,
          dietary: ['VEGAN'],
          sortOrder: 3,
          imageUrl:
            'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80',
        },
        {
          name: 'Natural Skin-Contact',
          description: 'Orange wine, apricot, tea leaf, gentle grip',
          price: 16,
          dietary: ['VEGAN'],
          sortOrder: 4,
          imageUrl:
            'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1200&q=80',
        },
        {
          name: 'Sauternes Half-Bottle',
          description: 'Honeyed apricot, saffron, perfect with cheese',
          price: 48,
          dietary: ['VEGAN'],
          sortOrder: 5,
          imageUrl:
            'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1200&q=80',
        },
      ],
    },
  ];

  for (const section of sections) {
    const { items, ...sectionData } = section;
    const created = await prisma.menuSection.create({ data: sectionData });
    for (const item of items) {
      await prisma.menuItem.create({
        data: {
          ...item,
          dietary: JSON.stringify(item.dietary),
          sectionId: created.id,
        },
      });
    }
  }

  const now = new Date();
  const closureDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth() + 1, 1),
  );

  await prisma.closure.create({
    data: {
      date: closureDate,
      reason: 'Private staff development day',
    },
  });


  await prisma.journalPost.createMany({
    data: [
      {
        slug: 'spring-tasting-preview',
        title: 'Spring Tasting Preview',
        body: 'Our spring tasting opens with pea velouté and ends with lemon verbena — a quiet conversation between garden and pastry.',
        coverImage:
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
        publishedAt: new Date(),
      },
      {
        slug: 'the-art-of-the-table',
        title: 'The Art of the Table',
        body: 'Service at Maison Verdant is choreography: pacing, silence, and the soft clink of crystal between courses.',
        coverImage:
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80',
        publishedAt: new Date(),
      },
      {
        slug: 'garden-to-glass',
        title: 'Garden to Glass',
        body: 'Herbs from our courtyard inform both kitchen and bar — verbena cordial, basil oil, and thyme honey for late evenings.',
        coverImage:
          'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80',
        publishedAt: new Date(),
      },
    ],
  });

  console.log('Seed complete: admin@maisonverdant.com / Admin123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
