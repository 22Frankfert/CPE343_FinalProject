import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';

const routers = Router();

const itemController = new ItemController();

routers.get('/', itemController.findAll);
routers.get('/:id', itemController.findById);
routers.post('/', itemController.create);
routers.delete('/:id', itemController.deleteById);

export default routers;
