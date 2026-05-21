import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
    return [
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
            name: 'Canon EOS 50D',
            price: 2000,
            description: 'Cheap, ideal for beginners',
        },
        {
            id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
            name: 'Canon EOS 5D',
            price: 5000,
            description: 'Professional camera, solid build',
        },
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
            name: 'Canon R',
            price: 3000,
            description: 'Professional camera, we technology',
        },
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
            name: 'Nikon D50',
            price: 2000,
            description: 'Cheap, ideal for beginners',
        },
        {
            id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
            name: 'Leica q2',
            price: 5000,
            description: 'Small, compact, innovative',
        },
    ];
}

function getOrders() {
    return [
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
            productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
            clientId: 'b7f20f8a-7a18-4e3e-86b8-8e20a3a5f001',
        },
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
            productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
            clientId: 'b7f20f8a-7a18-4e3e-86b8-8e20a3a5f002',
        },
        {
            id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
            productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
            clientId: 'b7f20f8a-7a18-4e3e-86b8-8e20a3a5f003',
        },
    ];
}

function getClients() {
    return [
        {
            id: 'b7f20f8a-7a18-4e3e-86b8-8e20a3a5f001',
            name: 'John Doe',
            address: '123 Main Street, London',
        },
        {
            id: 'b7f20f8a-7a18-4e3e-86b8-8e20a3a5f002',
            name: 'Jane Doe',
            address: '123 Main Street, London',
        },
        {
            id: 'b7f20f8a-7a18-4e3e-86b8-8e20a3a5f003',
            name: 'Thomas Jefferson',
            address: 'Baker Street 12B, New York',
        },
    ];
}

async function seed() {
    await Promise.all(
        getProducts().map((product) => {
            return db.product.create({ data: product });
        }),
    );

    await Promise.all(
        getClients().map((client) => {
            return db.client.create({ data: client });
        }),
    );

    await Promise.all(
        getOrders().map(({ productId, clientId, ...orderData }) => {
            return db.order.create({
                data: {
                    ...orderData,
                    product: {
                        connect: { id: productId },
                    },
                    client: {
                        connect: { id: clientId },
                    },
                },
            });
        }),
    );
}

seed();