import { Injectable, BadRequestException } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

type OrderInput = {
    productId: string;
    clientId: string;
};

@Injectable()
export class OrdersService {
    constructor(private prismaService: PrismaService) { }

    public getAll() {
        return this.prismaService.order.findMany({ include: { product: true, client: true } });
    }

    public getById(id: Order['id']) {
        return this.prismaService.order.findUnique({ where: { id }, include: { product: true, client: true } });
    }

    public deleteById(id: Order['id']): Promise<Order> {
        return this.prismaService.order.delete({ where: { id }, });
    }

    public async create(orderData: OrderInput): Promise<Order> {
        const { productId, clientId } = orderData;

        try {
            return await this.prismaService.order.create({
                data: {
                    product: {
                        connect: { id: productId },
                    },
                    client: {
                        connect: { id: clientId },
                    }
                },
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new BadRequestException("Product or client doesn't exist");
            }

            throw error;
        }
    }

    public updateById(
        id: string,
        orderData: OrderInput,
    ): Promise<Order> {
        const { productId, clientId } = orderData;

        return this.prismaService.order.update({
            where: { id },
            data: {
                product: {
                    connect: { id: productId },
                },
                client: {
                    connect: { id: clientId },
                }
            },
        });
    }
}