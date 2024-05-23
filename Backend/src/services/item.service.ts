import { Item } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class ItemService {

    async createItem(body: Item): Promise<Item> {
        try {
            if(!body.title) throw new Error('Title is required');

            return await prisma.item.create({ data: body });
        } catch (error) {
            throw error;
        }
    }

    async getItem(id: string): Promise<Item | null> {
        return await prisma.item.findUnique({ where: { id } });
    }

    async getAllItem(): Promise<Item[]> {
        return await prisma.item.findMany();
    }

    async updateItem(id: string, body: Item): Promise<Item | null> {
        return await prisma.item.update({
            where: {
                id,
            },
            data: {
                title: body.title,
                detail: body.detail,
                status: body.status,
                scheduled: body.detail,
            },
        });
    }

    async deleteItem(id: string): Promise<Item | null> {
        return await prisma.item.delete({ where: { id } });
    }
}
