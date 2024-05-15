import { Router } from "express";
import { itemGetController } from "../controllers/item.controller";

const routers = Router();

routers.get("/",  itemGetController);

export default routers;
