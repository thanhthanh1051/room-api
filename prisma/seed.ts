import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  const masterCategories = [
    { code: 'ROOM_TYPE', name: 'Loại phòng' },
    { code: 'POSITION', name: 'Vị trí' },
    { code: 'TOILET_TYPE', name: 'Toilet' },
    { code: 'DRYING_AREA', name: 'Sân phơi' },
    { code: 'PARKING_TYPE', name: 'Chỗ để xe' },
    { code: 'GATE_LOCK_TYPE', name: 'Loại khóa cổng' },
    { code: 'CURFEW_TYPE', name: 'Giờ giấc' },
    { code: 'FACILITY_DETAIL', name: 'Chi tiết nội thất' },
  ];

  const masterOptions = [
    {
      category: 'ROOM_TYPE',
      items: [
        'Phòng thường',
        '1 Phòng ngủ',
        '2 Phòng ngủ',
        '3 Phòng ngủ',
        'Phòng duplex',
        'Phòng studio',
        'Phòng gác',
        'Phòng studio tách bếp',
        'Mặt bằng',
      ],
    },
    {
      category: 'POSITION',
      items: ['Tầng trệt', 'Lầu 1', 'Lầu 2', 'Lầu 3', 'Lầu 4', 'Lầu 5'],
    },
    {
      category: 'TOILET_TYPE',
      items: ['Chung', 'Riêng'],
    },
    {
      category: 'DRYING_AREA',
      items: ['Chung', 'Riêng', 'Sân thượng'],
    },
    {
      category: 'PARKING_TYPE',
      items: ['Nhà xe', 'Hầm xe', 'Trong phòng', 'Để xe ngoài'],
    },
    {
      category: 'GATE_LOCK_TYPE',
      items: ['Vân tay', 'Thẻ từ', 'Ổ khóa cơ'],
    },
    {
      category: 'CURFEW_TYPE',
      items: ['Tự do', 'Theo quy định'],
    },
    {
      category: 'FACILITY_DETAIL',
      items: [
        'Gác',
        'Máy lạnh',
        'Giếng trời',
        'Bồn rửa chén',
        'Cửa sổ',
        'Ban công',
        'Tủ lạnh',
        'Tivi',
        'Thang máy',
        'Nước nóng',
        'Giường',
        'Nệm',
        'Tủ quần áo',
        'Không chung chủ',
        'Cho nuôi thú cưng',
        'Máy giặt riêng',
        'Nhận xe điện',
        'Máy giặt chung',
      ],
    },
  ];

  console.log('Seeding master_categories...');
  for (const cat of masterCategories) {
    await prisma.master_categories.upsert({
      where: { code: cat.code },
      update: { name: cat.name },
      create: { code: cat.code, name: cat.name },
    });
  }

  console.log('Seeding master_options...');
  for (const group of masterOptions) {
    console.log(`Seeding category: ${group.category}`);
    for (let i = 0; i < group.items.length; i++) {
      const name = group.items[i];
      const code = slugify(name, {
        replacement: '_',
        lower: true,
        strict: true,
        locale: 'vi',
      }).toUpperCase();

      await prisma.master_options.upsert({
        where: {
          category_code: {
            category: group.category,
            code: code,
          },
        },
        update: {
          name: name,
          sort_order: i,
        },
        create: {
          category: group.category,
          code: code,
          name: name,
          sort_order: i,
        },
      });
    }
  }

  console.log('Seed data completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
