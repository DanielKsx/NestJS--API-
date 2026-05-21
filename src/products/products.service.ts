import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
    constructor(private prismaService: PrismaService) { }

    public getAll(): Promise<Product[]> {
        return this.prismaService.product.findMany();
    }

    public getAllExtended() {
        return this.prismaService.product.findMany({
            include: { orders: true },
        });
    }

    public getExtendedById(id: Product['id']) {
        return this.prismaService.product.findUnique({
            where: { id },
            include: { orders: true },
        });
    }

    public getById(id: Product['id']): Promise<Product | null> {
        return this.prismaService.product.findUnique({ where: { id }, });
    }

    public deleteById(id: Product['id']): Promise<Product> {
        return this.prismaService.product.delete({
            where: { id },
        });
    }

    public create(
        productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<Product> {
        return this.prismaService.product.create({
            data: productData,
        });
    }

    public updateById(
        id: Product['id'],
        productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<Product> {
        return this.prismaService.product.update({
            where: { id },
            data: productData,
        });
    }
}
