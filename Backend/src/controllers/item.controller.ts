import { Request, Response, NextFunction } from "express";
import { ItemService } from "../services/item.service";
import { Item } from "@prisma/client";

export class ItemController {
    private itemService: ItemService;

    constructor() {
        this.itemService = new ItemService();
    }


    create = async (req: Request, res: Response, next: NextFunction) => {

        const data = req.body as Item;
        const result = await this.itemService.createItem(data);
        res.status(200).json({ message: result });
    };

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        const data = await this.itemService.getAllItem();
        res.status(200).json({ message: data });
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await this.itemService.getItem(id);
        res.status(200).json({ message: data });
    };

    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await this.itemService.deleteItem(id);
        res.status(200).json({ message: data });
    };
}
