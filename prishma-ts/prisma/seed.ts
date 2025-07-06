import { PrismaClient } from '../prisma/generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  console.log('🚀 Starting seeding process...');

  const roles = ['customer', 'admin', 'staff'];
  const paymentMethods = ['cod', 'card', 'upi', 'paypal'];
  const orderStatus = ['pending', 'paid', 'fulfilled', 'cancelled'];
  const paymentStatus = ['unpaid', 'paid', 'refunded'];
  const shippingMethods = ['standard', 'express', 'pickup'];

  // --- 1. Create 500 Users ---
  const users = [];
  for (let i = 0; i < 500; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        postalCode: faker.location.zipCode(),
        role: faker.helpers.arrayElement(roles),
        emailVerified: faker.datatype.boolean(),
        avatarUrl: faker.image.avatar(),
      },
    });
    users.push(user);
  }

  // --- 2. Create 1000 Products ---
  const products = [];
  for (let i = 0; i < 1000; i++) {
    const user = faker.helpers.arrayElement(users);
    const price = parseFloat(faker.commerce.price({ min: 100, max: 10000 }));
    const compareAt = faker.datatype.boolean()
      ? price + faker.number.float({ min: 10, max: 100 })
      : null;

    const product = await prisma.product.create({
      data: {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        vendor: faker.company.name(),
        price,
        compareAtPrice: compareAt,
        costPerItem: parseFloat(faker.commerce.price({ min: 50, max: price })),
        stock: faker.number.int({ min: 0, max: 100 }),
        sku: faker.string.uuid(),
        barcode: faker.string.uuid(),
        tags: JSON.stringify(faker.helpers.uniqueArray(faker.commerce.productAdjective, 3)),
        category: faker.commerce.department(),
        isPublished: true,
        publishedAt: faker.date.past(),
        imageUrl: faker.image.url(),
        additionalImages: JSON.stringify(
          Array.from({ length: 3 }, () => faker.image.url())
        ),
        rating: faker.number.float({ min: 1, max: 5 }),
        userId: user.id,
      },
    });

    products.push(product);
  }

  // --- 3. Create 2000 Orders ---
  for (let i = 0; i < 2000; i++) {
    const user = faker.helpers.arrayElement(users);
    const product = faker.helpers.arrayElement(products);
    const quantity = faker.number.int({ min: 1, max: 5 });
    const subtotal = product.price * quantity;
    const tax = subtotal * 0.18;
    const discount = faker.datatype.boolean()
      ? faker.number.float({ min: 5, max: 50 })
      : 0;
    const total = subtotal + tax - discount;

    await prisma.order.create({
      data: {
        orderNumber: `ORD-${faker.string.uuid()}`,
        quantity,
        subtotal,
        tax,
        total,
        discountCode:
          discount > 0 ? faker.word.adjective() + faker.number.int(999) : null,
        discountAmount: discount,
        status: faker.helpers.arrayElement(orderStatus),
        paymentStatus: faker.helpers.arrayElement(paymentStatus),
        paymentMethod: faker.helpers.arrayElement(paymentMethods),
        shippingAddress: faker.location.streetAddress(),
        shippingMethod: faker.helpers.arrayElement(shippingMethods),
        trackingNumber: faker.string.uuid(),
        notes: faker.lorem.sentence(),
        userId: user.id,
        productId: product.id,
      },
    });
  }

  console.log('✅ Done seeding database!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
