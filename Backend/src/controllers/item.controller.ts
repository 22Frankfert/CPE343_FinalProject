import { Request, Response, NextFunction } from 'express';

export const GetItem = async (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const itemList = QueryItemList();
	return res.status(200).json(itemList);
};

export const CreateItem = async (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	return res.status(200).json();
};
