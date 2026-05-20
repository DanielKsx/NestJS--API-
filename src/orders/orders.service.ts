import { Injectable } from '@nestjs/common';
import { db, Order } from './../db';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
    public getAll(): Order[] {
        return db.orders;
    }

    public getById(id: Order['id']): Order | null {
        return db.orders.find((p) => p.id === id) || null;
    }

    public deleteById(id: Order['id']): void {
        db.orders = db.orders.filter((p) => p.id !== id);
    }

    public create(orderData: CreateOrderDTO): Order {
        const newOrder = { ...orderData, id: uuidv4() };

        db.orders.push(newOrder);

        return newOrder;
    }

    public updateById(
        id: Order['id'],
        orderData: UpdateOrderDTO,
    ): void {
        db.orders = db.orders.map((p) => {
            if (p.id === id) {
                return { ...p, ...orderData };
            }

            return p;
        });
    }
}
