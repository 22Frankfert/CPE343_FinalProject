import { Router } from 'express';
import {
	GetItem,
	CreateItem,
	DeleteItem,
} from '../controllers/item.controller';

const routers = Router();

// fetch list
routers.get('/', GetItem);
// create item
routers.post('/', CreateItem);
// delete item
routers.delete('/:id', DeleteItem);

export default routers;
